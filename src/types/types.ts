export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  createdAt: string;
  status: "published" | "draft";
}