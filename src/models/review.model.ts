export interface Review {
    _id: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    restaurant: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}
