# Gym Management API
- Install Dependencies:
    npm install
- Create .env File, Add a .env file in the root directory with:
    MONGO_URI=mongodb://localhost:27017/gym_management
    PORT=8080
- Compile TypeScript:
    npm run build
- Start the Server:
    npm start
- Start tne server for development use:
    npm run dev
- To set the tenant locally you have to modify your vhost file and link the 127.0.0.1 with the tenant domain you find in src/config/tenant.ts
- API Endpoints
    * GET /api/members: List members
    * POST /api/members: Add a member
    * GET /api/members/: Get member by ID
    * PUT /api/members/









