"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProfileForm } from "@/components/shared/profile-form";
import { ToastContainer } from "@/components/toast-container";

export default function ProfilePage() {
  return (
    <div className="p-8">
      <Header />
      <ToastContainer />
      <div className="mt-16 overflow-x-auto">
        <ProfileForm />
      </div>
      <Footer />
    </div>
  );
}
