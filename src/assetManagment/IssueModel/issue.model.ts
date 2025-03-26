import { Prisma } from "@prisma/client";


export class Issue implements Prisma.IssueCreateInput{
    id: number;
    Designation: string;
    Name: string;
    Enrollmentno: string;
    Location: string;
    Area: string;
    Floorno: string;
    Roomno: string;
    Itemtype: string;
    Equipmentid: string;
    Issuedescription: string;
    Status: string;

}