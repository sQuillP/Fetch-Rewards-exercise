


/* Model for receiving data from API call */
export interface OccupationAndState {
    occupations:string[],
    states:string[]
};


/* Model for sending user info to API. */
export interface User {
    name:string,
    email:string,
    password:string,
    occupation:string,
    state:string
};