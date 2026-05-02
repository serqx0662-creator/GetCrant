export interface University {
    id: number;
    name: string;
    image: string;
    programsCount: number;
    studentsCount: number;
    location: {
        city: string;
        state: string;
        country: string;
    };
    cost: number;
    acceptanceRate: number;
    type: "Частный" | "Государственный";
}

export const mockUniversities: University[] = [
    {
        id: 1,
        name: "Harvard University",
        image: "/image/Universities/Univer 1-1.png",        /* Harvard University */
        programsCount: 120,
        studentsCount: 23000,
        location: { city: "Cambridge", state: "MA", country: "США" },
        cost: 54000,
        acceptanceRate: 4.5,
        type: "Частный",
    },
    {
        id: 2,
        name: "Stanford University",
        image: "/image/Universities/Univer 2-2.png",       /* Stanford University */
        programsCount: 150,
        studentsCount: 22000,
        location: { city: "Stanford", state: "CA", country: "США" },
        cost: 56000,
        acceptanceRate: 4.3,
        type: "Частный",
    },
    {
        id: 3,
        name: "MIT",
        image: "/image/Universities/Univer 3-3.png",            /* MIT */
        programsCount: 120,
        studentsCount: 11000,
        location: { city: "Cambridge", state: "MA", country: "США" },
        cost: 57000,
        acceptanceRate: 4.7,
        type: "Частный",
    },
    {
        id: 4,
        name: "University of California, Berkeley",
        image: "/image/Universities/Univer 4-4.png",       /* UC Berkeley */
        programsCount: 140,
        studentsCount: 30000,
        location: { city: "Berkeley", state: "CA", country: "США" },
        cost: 44000,
        acceptanceRate: 16.0,
        type: "Государственный",
    },
    {
        id: 5,
        name: "Princeton University",
        image: "/image/Universities/Univer 1-1.png",      /* Princeton University */
        programsCount: 90,
        studentsCount: 8000,
        location: { city: "Princeton", state: "NJ", country: "США" },
        cost: 55000,
        acceptanceRate: 5.8,
        type: "Частный",
    },
    {
        id: 6,
        name: "University of Toronto",
        image: "/image/Universities/Univer 2-2.png",        /* University of Toronto */
        programsCount: 200,
        studentsCount: 60000,
        location: { city: "Toronto", state: "ON", country: "Канада" },
        cost: 38000,
        acceptanceRate: 43.0,
        type: "Государственный",
    },
    {
        id: 7,
        name: "University of Oxford",
        image: "/image/Universities/Univer 3-3.png",         /* University of Oxford */
        programsCount: 150,
        studentsCount: 24000,
        location: { city: "Oxford", state: "", country: "Великобритания" },
        cost: 35000,
        acceptanceRate: 17.5,
        type: "Государственный",
    },
    {
        id: 8,
        name: "University of Cambridge",
        image: "/image/Universities/Univer 4-4.png",      /* University of Cambridge */
        programsCount: 180,
        studentsCount: 21000,
        location: { city: "Cambridge", state: "", country: "Великобритания" },
        cost: 33000,
        acceptanceRate: 21.0,
        type: "Государственный",
    },
    {
        id: 9,
        name: "ETH Zurich",
        image: "/image/Universities/Univer 1-1.png",     /* ETH Zurich */
        programsCount: 95,
        studentsCount: 22000,
        location: { city: "Zurich", state: "", country: "Швейцария" },
        cost: 1500,
        acceptanceRate: 27.0,
        type: "Государственный",
    },
    {
        id: 10,
        name: "University of Melbourne",
        image: "/image/Universities/Univer 2-2.png",      /* University of Melbourne */
        programsCount: 100,
        studentsCount: 52000,
        location: { city: "Melbourne", state: "VIC", country: "Австралия" },
        cost: 40000,
        acceptanceRate: 70.0,
        type: "Государственный",
    },
    {
        id: 11,
        name: "McGill University",
        image: "/image/Universities/Univer 3-3.png",         /* McGill University */
        programsCount: 90,
        studentsCount: 40000,
        location: { city: "Montreal", state: "QC", country: "Канада" },
        cost: 30000,
        acceptanceRate: 46.0,
        type: "Государственный",
    },
    {
        id: 12,
        name: "Imperial College London",
        image: "/image/Universities/Univer 4-4.png",       /* Imperial College London */
        programsCount: 100,
        studentsCount: 19000,
        location: { city: "London", state: "", country: "Великобритания" },
        cost: 36000,
        acceptanceRate: 14.3,
        type: "Государственный",
    },
];
