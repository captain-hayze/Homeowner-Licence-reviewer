"use client"
import { Suspense } from "react";
import ReviewerLayout from "../../../components/layouts/ReviewerLayout"
import ReviewDetails from "@/components/reviews/ReviewDetails";

export default function ReviewDetailPage() {
  return (
    <ReviewerLayout>
      <Suspense>
        <ReviewDetails />
      </Suspense>
    </ReviewerLayout>
  );
}
