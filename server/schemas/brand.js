/**
 * @swagger
 * /brand:
 *   get:
 *     tags:
 *       - Brand
 *     name: Get Brand
 *     summary: Get Brand
 *     parameters:
 *       - in: query
 *         name: brand_idx
 *         schema:
 *           properties:
 *             name:
 *               type: number
 *     responses:
 *       '200':
 *         description: Get Brand
 *       '404':
 *         description: fail
 * 
 *   post:
 *     tags:
 *       - Brand
 *     name: Register Brand
 *     summary: Register Brand
 *     description: Register Brand
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             brand_name:
 *               type: string
 *           example:
 *             brand_name: new_brand 
 *     responses:
 *       '200':
 *         description: Register Brand
 *       '404':
 *         description: fail
 */