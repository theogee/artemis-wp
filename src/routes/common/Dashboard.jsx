export async function loader() {
    /** 
     * TODO: check if logged in & what type of user
     * fetch respective data required by the page
     * 
     * Idea: await fetch("http://127.0.0.1:55555/api/meta")
     * return: {
     *      success: false,
     *      servError: ["redis service didn't accept connection"],
     *      data: {
     *          userType: "admin",
     *          isLoggedIn: true 
     *      }
     * }
     * 
     * from this api we can do a conditional rendering between AdminDashboard and StudentDashboard
     * */ 
    console.log("loader called")
    return null
}

export default function Dashboard() {
    return <div>Welcome to Artemis Dashboard!</div>
}