
type HomeOwnerProject = {
  id: string;
  name: string;
  publicId: string;
}

type ReviewComment = {
  user: string;
  text: string;
}

type ReviewDocument = {
  id: string;
  title: string;
  src?: string;
  comments: ReviewComment[];
}

type Review = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  status: "ARCH_REVIEW" | "IN_REVIEW" | "COMPLETED";
  documents: ReviewDocument[];
  comments: ReviewComment[];
  homeOwnerProject: HomeOwnerProject;
}