import express from "express";
import { Survey, Question, QuestionOption, SurveyResponse, QuestionResponse } from "../models";
import { body, validationResult } from "express-validator";
import { authenticate, requireAdmin } from "../middleware/auth";

const router = express.Router();


// Get all active surveys
router.get("/", authenticate, async (req: any, res: any) => {
    try {
        const surveys = await Survey.findAll({
            where: { status: 1 },
            include: [{ model: Question, include: [QuestionOption] }],
        });
        res.json(surveys);
    } catch (error) {
        console.error("Error fetching surveys:", error);
        res.status(500).json({ message: "Failed to fetch surveys." });
    }
});

//Get survey by ID
router.get("/:id/responses", authenticate, async (req: any, res: any) => {
    try {
        const { responses } = req.body;
        const userId = req.user.id;
        const surveyId = req.params.id;

        //Check if user has already completed the survey
        const existingResponse = await SurveyResponse.findOne({ where: { userId, surveyId } });
        if (existingResponse) {
            return res.status(400).json({ message: "You have already completed this survey." });
        }

        const surveyResponse = await SurveyResponse.create({
            userId,
            surveyId
        });

        const questionResponses = await Promise.all(responses.map(async (response: any) => {
            return await QuestionResponse.create({
                responseId: surveyResponse.id,
                questionId: response.questionId,
                answer: response.answer
            });
        }));

        res.json({ message: "Survey saved successfully.", responseId: surveyResponse.id });
    }
    catch (error) {
        console.error("Error fetching survey:", error);
        res.status(500).json({ message: "Failed to fetch survey." });
    }
});

// Get user's survey responses
router.get(":id/responses", authenticate, async (req: any, res: any) => {
    try {
        const userId = req.user.id;
        const surveyId = req.params.id;

        const surveyResponses = await SurveyResponse.findOne({
            where: { userId, surveyId },
            include: [{ model: QuestionResponse, include: [Question] }],
        });

        if (!surveyResponses) {
            return res.status(404).json({ message: "No responses found for this survey." });
        }

        res.json(surveyResponses);

    } catch (error) {
        console.error("Error fetching survey responses:", error);
        res.status(500).json({ message: "Failed to fetch survey responses." });
    }
});

// Create a new survey (Admin only)
router.post("/", authenticate, requireAdmin, [
    body("title").isString().notEmpty().withMessage("Title is required"),
    body("description").isString().optional()
], async (req: any, res: any) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, questions } = req.body;
        const newSurvey = await Survey.create({ title, description, status: 1 });

        if (questions && Array.isArray(questions) && questions.length > 0) {
            for (const q of questions) {
                const newQuestion = await Question.create({
                    surveyId: newSurvey.id,
                    text: q.text,
                    type: q.type,
                    is_required: q.is_required || false,
                    order: q.order || 0
                });
                if (q.options && Array.isArray(q.options) && q.options.length > 0) {
                    for (const optionData of q.options) {
                        await QuestionOption.create({
                            questionId: newQuestion.id,
                            text: optionData.text,
                            value: optionData.value,
                            order: optionData.order || 0
                        });
                    }
                }
            }
        }
        const createdSurvey = await Survey.findByPk(newSurvey.id, { include: [{ model: Question, include: [QuestionOption] }] });
        res.status(201).json(createdSurvey);
    } catch (error) {
        console.error("Error creating survey:", error);
        res.status(500).json({ message: "Failed to create survey." });
    }
});

export default router;