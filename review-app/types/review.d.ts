
type Review = {
  id: string;
  title: string;
  address: string;
  status: "in-review" | "requested" | "completed";
  documents: Array<{ title: string; src?: string }>;
  comments: Array<{ user: string; text: string }>;
}