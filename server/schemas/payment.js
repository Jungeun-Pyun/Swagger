/**
 * @swagger
 * /payment:
 *   get:
 *     tags:
 *       - Payment
 *     name : Get Payment
 *     summary: Get Payment
 *     description: Get Payment
 *     parameters:
 *       - name: user_idx
 *         in: query
 *         schema:
 *           properties:
 *             type: number
 *     responses:
 *       '200':
 *         description: Get Payment
 *       '404':
 *         description: fail
 * 
 *   post:
 *     tags:
 *       - Payment
 *     name: Register Payment
 *     summary: Register Payment
 *     description: Register Payment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             payment_way:
 *               type: string
 *             amount:
 *               type: number
 *             orders_idx:
 *               type: number
 *           example:
 *             payment_way: card
 *             amount: 5000
 *             orders_idx: 5
 *     responses:
 *       '200':
 *         description: Register Payment
 *       '404':
 *         description: fail
 * 
 */