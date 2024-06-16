import { Story } from "./story";

export interface Sprint {
    Id: string,
    Name: string,
    StartDate: Date,
    EndDate: Date,
    Points: number,
    AddedStories: Story[]
}