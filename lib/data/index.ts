export interface Column {
  id: number;
  title: string;
  description: string;
  status: "done" | "in progress";
}

export const DATA: Column[] = [
  {
    id: 1,
    title: "Get all data from db",
    description: "Get all data from db description",
    status: "done",
  },
  {
    id: 2,
    title: "Update user information",
    description: "Update user information description",
    status: "in progress",
  },
  {
    id: 3,
    title: "Delete data from db",
    description: "Delete data from db description",
    status: "done",
  },
  {
    id: 4,
    title: "Create new record",
    description: "Create new record description",
    status: "in progress",
  },
  {
    id: 5,
    title: "Search data by keyword",
    description: "Search data by keyword description",
    status: "done",
  },
  {
    id: 6,
    title: "Generate report",
    description: "Generate report description",
    status: "in progress",
  },
  {
    id: 7,
    title: "Send email notification",
    description: "Send email notification description",
    status: "done",
  },
  {
    id: 8,
    title: "Export data to CSV",
    description: "Export data to CSV description",
    status: "in progress",
  },
  {
    id: 9,
    title: "Import data from JSON",
    description: "Import data from JSON description",
    status: "done",
  },
  {
    id: 10,
    title: "Validate input fields",
    description: "Validate input fields description",
    status: "in progress",
  },
  {
    id: 11,
    title: "Sort data by column",
    description: "Sort data by column description",
    status: "done",
  },
  {
    id: 12,
    title: "Filter data by criteria",
    description: "Filter data by criteria description",
    status: "in progress",
  },
  {
    id: 13,
    title: "Calculate total",
    description: "Calculate total description",
    status: "done",
  },
  {
    id: 14,
    title: "Generate random data",
    description: "Generate random data description",
    status: "in progress",
  },
  {
    id: 15,
    title: "Backup database",
    description: "Backup database description",
    status: "done",
  },
  {
    id: 16,
    title: "Restore database",
    description: "Restore database description",
    status: "in progress",
  },
  {
    id: 17,
    title: "Send push notification",
    description: "Send push notification description",
    status: "done",
  },
  {
    id: 18,
    title: "Generate unique ID",
    description: "Generate unique ID description",
    status: "in progress",
  },
  {
    id: 19,
    title: "Encrypt sensitive data",
    description: "Encrypt sensitive data description",
    status: "done",
  },
  {
    id: 20,
    title: "Decrypt encrypted data",
    description: "Decrypt encrypted data description",
    status: "in progress",
  },
];
