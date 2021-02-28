/**
 * @swagger
 * /goods_img:
 *   post:
 *     tags:
 *       - Goodsimg
 *     name: Register Goods Image
 *     summary: Register Goods Image
 *     description: Register Goods Image
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             goods_idx:
 *               type: number
 *             img_path:
 *               type: string
 *           example:
 *             goods_idx: 1
 *             img_path: images/users/1/background.jepg
 *     reponses:
 *       '200':
 *         description: Register Goods Image
 *       '404':
 *         description: fail
 * 
 * 
 * 
 */