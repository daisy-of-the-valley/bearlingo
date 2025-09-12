import React, { useState, useEffect } from "react";
import api from "../../lib/axios";
import { toast } from "react-hot-toast";
import CompanyResearchList from "../../components/InterviewModuleComponents/CompanyResearchList";
import CompanyResearchForm from "../../components/InterviewModuleComponents/CompanyResearchForm";
import { getSubtaskBySequenceNumber } from "../../utils/moduleHelpers";
import { useUserStore } from "../../store/user";

const InterviewSubtask2 = ({ setIsSubmitted }) => {
  const [researches, setResearches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // null if adding, object if editing

  // Fetch existing company research data from the database
  const fetchResearches = async () => {
    try {
      const res = await api.get("/users/me/interview/company-researches", {
        withCredentials: true
      });
      // Sort the researches from latest to oldest
      const sorted = (res.data || []).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // latest first
    );

    setResearches(sorted);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch company researches");
    }
  };

  useEffect(() => {
    fetchResearches();
  }, []);

  // Still working on this. Because now, even if user just open the task and refresh the warning sign shows up
  // Warn before reload/close browser 
    // useEffect(() => {
    //   const handleBeforeUnload = (e) => {
    //     if (!isSubmitted) {
    //       e.preventDefault();
    //       e.returnValue = "You have unsaved changes. Are you sure you want to leave this page?";
    //       return e.returnValue;
    //     }
    //   };
    //   window.addEventListener("beforeunload", handleBeforeUnload);
    //   return () => {
    //     window.removeEventListener("beforeunload", handleBeforeUnload);
    //   };
    // }, [isSubmitted]);

  // Send company research data to the backend
  const { completeTask } = useUserStore();
  const handleSave = async (form) => {
    try {
      // create new
      await api.post("/users/me/interview/company-research", form, { withCredentials: true });
      toast.success("Company research saved!");
      setShowForm(false);
      setIsSubmitted(true);
      setEditing(null);
      fetchResearches();

      // Get subtaskId by module name, level number and subtask sequence number
      let subtaskId;
      try {
        subtaskId = await getSubtaskBySequenceNumber("Interview", 1, 2);
      } catch (err) {
        console.error("Failed to get subtask ID", err);
        toast.error("Could not find subtask");
        return;
      }
      // Mark subtask as completed
      try {
        const res = await completeTask(subtaskId);
        // Check if subtask is completed and display appropriate message
        if (res.data.message === "Well Done! You completed the subtask") {
          toast.success("Task 1 completed!");
        }
      } catch (err) {
        console.error("Failed to complete task", err);
        toast.error("Could not mark task complete");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save company research");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/me/interview/company-research/${id}`, { withCredentials: true });
      toast.success("Deleted successfully");
      fetchResearches();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete company research");
    }
  };

  return (
    <div className="p-4">
      {!showForm ? (
        <CompanyResearchList
          researches={researches}
          onAddClick={() => {
            setShowForm(true);
            setEditing(null);
          }}
          onDelete={handleDelete}
          onEdit={(research) => {
            setEditing(research);
            setShowForm(true);
          }}
        />
      ) : (
        <CompanyResearchForm
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          initialData={editing}
          editingId={editing?._id || null}
        />
      )}
    </div>
  );
};

export default InterviewSubtask2;
