/**
 * @swagger
 * /user_img:
 *   post:
 *     tags:
 *       - UserImg
 *     name: Register User Image
 *     summary: Register User Image
 *     description: Register User Image
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             user_idx:
 *               type: number
 *             img_path:
 *               type: string
 *           example:
 *             user_idx: 1
 *             img_path: images/users/1/background.jepg
 *     reponses:
 *       '200':
 *         description: Register User Image
 *       '404':
 *         description: fail
 * 
 * 
 * 
 */