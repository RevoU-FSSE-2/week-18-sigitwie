import { Request, Response } from 'express';
import CommentDAO from '../dao/CommentDAO';


export async function createComment(req: Request, res: Response): Promise<Response> {
    try {
        const commentData = req.body;
        const comment = await CommentDAO.createComment(commentData);
        return res.status(201).json(comment);
    } catch (error) {
        return res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
}

export async function getCommentById(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
        const comment = await CommentDAO.getCommentById(id);
        if (comment) {
            return res.status(200).json(comment);
        } else {
            return res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
}


export async function updateComment(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const [affectedCount] = await CommentDAO.updateComment(id, updateData);

        if (affectedCount > 0) {
            return res.status(200).json({ message: 'Comment updated successfully' });
        } else {
            return res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
}


export async function deleteComment(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
        await CommentDAO.deleteComment(id);
        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
}
