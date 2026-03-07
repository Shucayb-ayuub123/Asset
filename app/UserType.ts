export type Users = {
  username: string;
  password: string;
  role?: "admin" | "user";
};

export type computer = {
  id?:number,
  com_name: string;
  com_version: string;
  os_version: string;
  cpu: string;
  storage: string;
  ant_virus: "Active" | "Expired" | "Expired-soon";
  days_remaining: number;
  Time_added?:Date
};
export type printer = {
  id?:number,
  printer_name: string;
  brand: string;
  model: string;
  scanner: "Yes" | "No";
  color: "Black & white" | "Color";
  location: string;
  status: "Active" | "Inactive" | "Maintenance";
  Time_added?:Date
};
export type OtherDevices = {
  id?:number,
  device_name: string;
  device_type: string;
  functions: string;
  location: string;

  status: "Active" | "Inactive" | "Maintenance";
  Time_added?:Date
};

// export type OtherDevices = {
//   id?:number,
//   device_name: string;
//   device_type: string;
//   functions: string;
//   location: string;

//   status: "Active" | "Inactive" | "Maintenance";
// };
