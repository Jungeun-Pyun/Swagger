/**
 * @swagger
 * /orders:
 *   get:
 *     tags:
 *       - Orders
 *     name : Get Order
 *     summary: Get Order
 *     description: Get Order
 *     parameters:
 *       - name: user_idx
 *         in: query
 *         schema:
 *           properties:
 *             type: number
 *       - name: goods_idx
 *         in: query
 *         schema:
 *           properties:
 *             type: number
 *     responses:
 *       '200':
 *         description: Get Order
 *       '404':
 *         description: fail
 * 
 *   post:
 *     tags:
 *       - Orders
 *     name: Register Order
 *     summary: Register Order
 *     description: Register Order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             user_idx:
 *               type: number
 *             goods_idx:
 *               type: number
 *             qty:
 *               type: number
 *           example:
 *             user_idx: 1
 *             goods_idx: 3
 *             qty: 5
 *     responses:
 *       '200':
 *         description: Register Order
 *       '404':
 *         description: fail
 * 
 *   put:
 *     tags:
 *       - Orders
 *     name: Update Order
 *     summary: Update Order
 *     description: Update Order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             orders_idx:
 *               type: number
 *             user_idx:
 *               type: number
 *             goods_idx:
 *               type: number
 *             qty:
 *               type: number
 *           example:
 *             orders_idx: 1
 *             user_idx: 1
 *             goods_idx: 3
 *             qty: 5
 *     responses:
 *       '200':
 *         description: Update Order
 *       '404':
 *         description: fail
 * 
 */