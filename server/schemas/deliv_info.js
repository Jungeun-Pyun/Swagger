/**
 * @swagger
 * /deliv_info:
 *   get:
 *     tags:
 *       - DelivInfo
 *     name: Get Deliv info
 *     summary: Get Deliv info
 *     parameters:
 *       - in: query
 *         name: user_idx
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: number
 *     responses:
 *       '200':
 *         description: Get Delivinfo
 *       '404':
 *         description: fail
 * 
 *   post:
 *     tags:
 *       - DelivInfo
 *     name: Register DelivInfo
 *     summary: Register DelivInfo
 *     description: Register DelivInfo
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             user_idx:
 *               type: integer
 *             base_address:
 *               type: string
 *             detail_address:
 *               type: array
 *             zipcode:
 *               type: string
 *           example:
 *             user_idx: 4
 *             base_address: 주소3
 *             detail_address: 주소3-3
 *             zipcode: "23423"
 *             
 *     responses:
 *       '200':
 *         description: Register DelivInfo
 *       '404':
 *         description: fail
 * 
 * /deliv_info/multi:
 *   put:
 *     tags:
 *       - DelivInfo
 *     name: Multi update DelivInfo
 *     summary: Multi update DelivInfo
 *     description: Multi update DelivInfo
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *           example:
 *             list : [
 *               { 
 *                  deliv_info_idx: 4,
 *                  base_address: 주소3,
 *                  detail_address: 주소3-3,
 *                  zipcode: "23423"
 *               }
 *             ]
 *             
 *     responses:
 *       '200':
 *         description: Multi update DelivInfo
 *       '404':
 *         description: fail
 */