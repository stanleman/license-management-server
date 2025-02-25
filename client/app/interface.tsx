export interface Request {
    _id: string,
    title: string,
    type: string,
    features: {name: string}[],
    duration_in_months: number,
    notes: string,
    approved: string,
    created_at: string,
    operator: User,
    status: string
}

export interface User {
    id: string,
    email: string,
    name: string,
    role: string
}