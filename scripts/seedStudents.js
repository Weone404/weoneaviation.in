// scripts/seedStudents.js
// Run once:  node scripts/seedStudents.js
// Requires:  MONGODB_URI in your .env.local

import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI not set in .env.local");

const STUDENTS = [
    {
        name: "Arjun Mehta",
        avatar: "AM",
        email: "arjun.mehta@weoneaviation.com",
        batch: "CPL-2024-A",
        overallProgress: 72,
        groundSchool: 78,
        flyingLessons: 65,
        simulatorSessions: 50,
        lastActive: "Today",
        status: "active",
        mockAvgScore: 74,
        lecturesWatched: 48,
        lecturesTotal: 120,
        subjects: {
            airRegulations: { progress: 88, avgScore: 88, topicsCompleted: 28, totalTopics: 28 },
            aviationMeteorology: { progress: 72, avgScore: 70, topicsCompleted: 23, totalTopics: 32 },
            airNavigation: { progress: 70, avgScore: 68, topicsCompleted: 60, totalTopics: 86 },
            technical: { progress: 55, avgScore: 60, topicsCompleted: 22, totalTopics: 40 },
            radioTelephony: { progress: 75, avgScore: 77, topicsCompleted: 18, totalTopics: 24 },
        },
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date(),
    },
    {
        name: "Priya Singh",
        avatar: "PS",
        email: "priya.singh@weoneaviation.com",
        batch: "CPL-2024-A",
        overallProgress: 88,
        groundSchool: 92,
        flyingLessons: 85,
        simulatorSessions: 80,
        lastActive: "Today",
        status: "active",
        mockAvgScore: 91,
        lecturesWatched: 98,
        lecturesTotal: 120,
        subjects: {
            airRegulations: { progress: 100, avgScore: 95, topicsCompleted: 28, totalTopics: 28 },
            aviationMeteorology: { progress: 90, avgScore: 88, topicsCompleted: 29, totalTopics: 32 },
            airNavigation: { progress: 85, avgScore: 82, topicsCompleted: 73, totalTopics: 86 },
            technical: { progress: 80, avgScore: 85, topicsCompleted: 32, totalTopics: 40 },
            radioTelephony: { progress: 92, avgScore: 90, topicsCompleted: 22, totalTopics: 24 },
        },
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date(),
    },
    {
        name: "Rohan Desai",
        avatar: "RD",
        email: "rohan.desai@weoneaviation.com",
        batch: "CPL-2024-B",
        overallProgress: 54,
        groundSchool: 60,
        flyingLessons: 45,
        simulatorSessions: 55,
        lastActive: "Yesterday",
        status: "at-risk",
        mockAvgScore: 58,
        lecturesWatched: 32,
        lecturesTotal: 120,
        subjects: {
            airRegulations: { progress: 65, avgScore: 60, topicsCompleted: 18, totalTopics: 28 },
            aviationMeteorology: { progress: 50, avgScore: 55, topicsCompleted: 16, totalTopics: 32 },
            airNavigation: { progress: 48, avgScore: 50, topicsCompleted: 41, totalTopics: 86 },
            technical: { progress: 45, avgScore: 52, topicsCompleted: 18, totalTopics: 40 },
            radioTelephony: { progress: 60, avgScore: 62, topicsCompleted: 14, totalTopics: 24 },
        },
        createdAt: new Date("2024-03-01"),
        updatedAt: new Date(),
    },
    {
        name: "Neha Kapoor",
        avatar: "NK",
        email: "neha.kapoor@weoneaviation.com",
        batch: "CPL-2024-B",
        overallProgress: 81,
        groundSchool: 85,
        flyingLessons: 78,
        simulatorSessions: 75,
        lastActive: "Today",
        status: "active",
        mockAvgScore: 83,
        lecturesWatched: 80,
        lecturesTotal: 120,
        subjects: {
            airRegulations: { progress: 92, avgScore: 90, topicsCompleted: 26, totalTopics: 28 },
            aviationMeteorology: { progress: 80, avgScore: 78, topicsCompleted: 26, totalTopics: 32 },
            airNavigation: { progress: 78, avgScore: 75, topicsCompleted: 67, totalTopics: 86 },
            technical: { progress: 72, avgScore: 76, topicsCompleted: 29, totalTopics: 40 },
            radioTelephony: { progress: 85, avgScore: 87, topicsCompleted: 20, totalTopics: 24 },
        },
        createdAt: new Date("2024-03-01"),
        updatedAt: new Date(),
    },
    {
        name: "Vikram Joshi",
        avatar: "VJ",
        email: "vikram.joshi@weoneaviation.com",
        batch: "CPL-2024-C",
        overallProgress: 43,
        groundSchool: 40,
        flyingLessons: 48,
        simulatorSessions: 42,
        lastActive: "3 days ago",
        status: "inactive",
        mockAvgScore: 45,
        lecturesWatched: 18,
        lecturesTotal: 120,
        subjects: {
            airRegulations: { progress: 45, avgScore: 42, topicsCompleted: 13, totalTopics: 28 },
            aviationMeteorology: { progress: 38, avgScore: 40, topicsCompleted: 12, totalTopics: 32 },
            airNavigation: { progress: 40, avgScore: 38, topicsCompleted: 34, totalTopics: 86 },
            technical: { progress: 42, avgScore: 44, topicsCompleted: 17, totalTopics: 40 },
            radioTelephony: { progress: 48, avgScore: 50, topicsCompleted: 12, totalTopics: 24 },
        },
        createdAt: new Date("2024-06-01"),
        updatedAt: new Date(),
    },
    {
        name: "Ananya Rao",
        avatar: "AR",
        email: "ananya.rao@weoneaviation.com",
        batch: "CPL-2024-A",
        overallProgress: 67,
        groundSchool: 70,
        flyingLessons: 62,
        simulatorSessions: 68,
        lastActive: "Today",
        status: "active",
        mockAvgScore: 69,
        lecturesWatched: 55,
        lecturesTotal: 120,
        subjects: {
            airRegulations: { progress: 75, avgScore: 72, topicsCompleted: 21, totalTopics: 28 },
            aviationMeteorology: { progress: 65, avgScore: 63, topicsCompleted: 21, totalTopics: 32 },
            airNavigation: { progress: 62, avgScore: 60, topicsCompleted: 53, totalTopics: 86 },
            technical: { progress: 58, avgScore: 62, topicsCompleted: 23, totalTopics: 40 },
            radioTelephony: { progress: 70, avgScore: 74, topicsCompleted: 17, totalTopics: 24 },
        },
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date(),
    },
];

async function seed() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db("weoneaviation");
        const col = db.collection("students");

        // Drop existing, then insert fresh
        await col.deleteMany({});
        const result = await col.insertMany(STUDENTS);
        console.log(`✅  Inserted ${result.insertedCount} students into weoneaviation.students`);
    } finally {
        await client.close();
    }
}

seed().catch(err => { console.error(err); process.exit(1); });