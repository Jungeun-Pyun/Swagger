/**
 * @swagger
 * /category:
 *   get:
 *     tags:
 *       - Category
 *     name: Get Category
 *     summary: Get Category
 *     parameters:
 *       - in: query
 *         name: category_idx
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: number
 *     responses:
 *       '200':
 *         description: Get Category
 *       '404':
 *         description: fail
 * 
 *   post:
 *     tags:
 *       - Category
 *     name: Register Category
 *     summary: Register Category
 *     description: Register Category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema: 
 *           properties:
 *             category_name:
 *               type: string
 *           example:
 *             category_name : 신발

 *     responses:
 *       '200':
 *         description: Register Category
 *       '404':
 *         description: fail
 */