/**
 * @swagger
 * 
 * /review:
 *   put:
 *     tags:
 *       - Review
 *     name: Update review
 *     summary: Update review
 *     description: Update review
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           example:
 *             review_idx : 2
 *             goods_idx : 4
 *             user_idx : 13
 *             content : 수정
 *             star : 5
 *
 *     responses:
 *       '200':
 *         description: Update Review
 *       '404':
 *         description: fail
 * 
 *   delete:
 *     tags:
 *       - Review
 *     name: Delete review
 *     summary: Delete review
 *     description: Delete review
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: review_idx
 *         in: formData
 *         required: true
 *         type: string
 * 
 *     responses:
 *       '200':
 *         description: Delete Review
 *       '404':
 *         description: fail
 */