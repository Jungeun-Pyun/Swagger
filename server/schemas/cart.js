/**
 * @swagger
 * /cart:
 *   get:
 *     tags:
 *       - Cart
 *     name: Get Cart
 *     summary: Get Cart
 *     parameters:
 *       - name: cart_idx
 *         in: query
 *         schema:
 *           properties:
 *             type: number
 *       - name: user_idx
 *         in: query
 *         schema:
 *           properties:
 *             type: number
 *     responses:
 *       '200':
 *         description: Get Cart
 *       '404':
 *         description: fail
 * 
 *   post:
 *     tags:
 *       - Cart
 *     name: Register Cart
 *     summary: Register Cart
 *     description: Register Cart
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
 *         description: Register Cart
 *       '404':
 *         description: fail
 * 
 *   put:
 *     tags:
 *       - Cart
 *     name: Update Cart
 *     summary: Update Cart
 *     description: Update Cart
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             cart_idx:
 *               type: number
 *             user_idx:
 *               type: number
 *             goods_idx:
 *               type: number
 *             qty:
 *               type: number
 *           example:
 *             cart_idx: 1
 *             user_idx: 1
 *             goods_idx: 3
 *             qty: 5
 *     responses:
 *       '200':
 *         description: Update Cart
 *       '404':
 *         description: fail
 * 
 * 
 *   delete:
 *     tags:
 *       - Cart
 *     name: Delete Cart
 *     summary: Delete Cart
 *     description: Delete Cart
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             cart_idx:
 *               type: number
 *           example:
 *             cart_idx: 1
 *     responses:
 *       '200':
 *         description: Delete Cart
 *       '404':
 *         description: fail
 *                   
 *           
 */