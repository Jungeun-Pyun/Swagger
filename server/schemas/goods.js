/**
 * @swagger
 * /goods:
 *   get:
 *     tags:
 *       - Goods
 *     name: Get goods
 *     summary: Get goods
 *     parameters:
 *       - in: query
 *         name: goods_idx
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: number
 *     responses:
 *       '200':
 *         description: Get goods
 *       '404':
 *         description: fail
 * 
 *   post:
 *     tags:
 *       - Goods
 *     name: Register Goods
 *     summary: Register Goods
 *     description: Register Goods
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema: 
 *           properties:
 *             goods_name:
 *               type: string
 *             goods_price:
 *               type: integer
 *             images:
 *               type: array
 *               items:
 *                 type: string
 *             brand_idx:
 *               type: number
 *             category_idx:
 *               type: integer
 *           example:
 *             goods_name : goods4
 *             goods_price : 123123
 *             images : [
 *               "images/users/1/background.jepg",
 *               "images/users/2/스크린샷 2021-01-31 오후 6.25.57.png"
 *             ]
 *             brand_idx : 1
 *             category_idx : 1
 *     responses:
 *       '200':
 *         description: Register Goods
 *       '404':
 *         description: fail
 */