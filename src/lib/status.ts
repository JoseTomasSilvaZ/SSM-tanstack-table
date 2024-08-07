import { badgeVariants } from "@/components/ui/badge";
import { Status } from "@prisma/client";
import { VariantProps } from "class-variance-authority";

type StatusObject = {
  [key in Status]: {
    label: string;
    variant: VariantProps<typeof badgeVariants>;
  };
};
// const statusObject: StatusObject = {
//   CANCELLED: { label: "Cancelled", variant: "default" },
//   COMPLETED: { label: "Completed", variant: "green" },
//   IN_PROGRESS: { label: "In progress", variant: "blue" },
//   TODO: { label: "To do", variant: "yellow" },
// };
// export const resolveStatus = (
//   status: Status
// ): { label: string; variant: VariantProps<typeof badgeVariants> } => {
//   // return statusObject[status as Status];
// };
