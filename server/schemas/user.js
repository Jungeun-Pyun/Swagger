/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - Users
 *     name: Get user
 *     summary: Get user
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
 *         description: Get User
 *       '404':
 *         description: fail
 * 
 * 
 * /user/signin:
 *   post:
 *     tags:
 *       - Users
 *     name: User Sign in
 *     summary: User Sign in
 *     description: User sign in
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         in: formData
 *         required: true
 *         type: string
 *       - name: user_pwd
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: User Sign in
 *       '404':
 *         description: fail
 * 
 * 
 * /user/signUp:
 *   post:
 *     tags:
 *       - Users
 *     name: User SignUp
 *     summary: User Sign Up
 *     description: User sign up
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             user_id:
 *               type: string
 *             user_pwd:
 *               type: string
 *             images:
 *               type: array
 *               items:
 *                 type: string
 *             deliv_info:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   base_address:
 *                     type: string
 *           example:
 *             user_id: test_0219
 *             user_name: test_0219
 *             user_pwd: "123123"
 *             images : [
 *               "images/users/1/background.jepg",
 *               "images/users/2/스크린샷 2021-01-31 오후 6.25.57.png"
 *             ]
 *             deliv_info : [
 *               {
 *                "base_address":"base address 1",
 *                "detail_address":"detail address 1",
 *                "zipcode" : "zipcode 1"
 *               }
 *             ]
 *             
 *     responses:
 *       '200':
 *         description: User Sign up
 *       '404':
 *         description: fail
 * 
 * 
 */