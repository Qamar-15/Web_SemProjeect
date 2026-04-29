# Time Keepers - Luxury Watches E-commerce

This is a fully functional web application developed for the Semester Web Application Project. It is a luxury watch e-commerce platform that includes both a user-facing storefront and an administrative staff portal.

## 🛠 Tech Stack

**Frontend:**
*   **HTML5:** Structure and semantics.
*   **CSS3:** Vanilla CSS for responsive design, custom styling, and animations.
*   **JavaScript (ES6+):** Client-side logic, DOM manipulation, and API interactions.

**Backend & Database:**
*   **Supabase:** Backend-as-a-Service (BaaS).
*   **PostgreSQL:** Relational database hosted by Supabase.
*   **Supabase Storage:** Cloud storage bucket for managing uploaded product images.

**Architecture:**
*   **Session Management:** Handled via JavaScript and browser `localStorage`.
*   **Client-Side Rendering:** Data is fetched dynamically via the Supabase JS SDK and rendered into the DOM.

---

## ⚙️ Setup Instructions

Since this project utilizes a cloud-based Backend-as-a-Service (Supabase) and vanilla web technologies, there are no heavy Node.js dependencies, package installations (`npm install`), or build steps required.

1.  **Clone the Repository:**
    Download or clone the project folder to your local machine:
    ```bash
    git clone https://github.com/Qamar-15/Web_SemProjeect.git
    ```

2.  **Database Configuration:**
    The project is pre-configured to connect to the live Supabase cloud database. 
    The API keys and database URLs are already safely implemented in the configuration files:
    *   `js/user-config.js` (User Application)
    *   `js/admin-config.js` (Admin Portal)
    
    *No manual database configuration or SQL imports are necessary.*

---

## 🚀 How to Run the App

Because this is a static frontend application with a cloud backend, you can run it instantly using any basic web server.

### Method 1: Using VS Code (Recommended)
1. Open the project folder (`Web_SemProjeect`) in Visual Studio Code.
2. Install the **"Live Server"** extension by Ritwick Dey.
3. Right-click on `index.html` in the file explorer and select **"Open with Live Server"**.
4. The application will automatically open in your default browser at `http://127.0.0.1:5500`.

### Method 2: Using Python (Terminal)
If you have Python installed on your computer, you can easily host the files locally to avoid CORS security restrictions:
1. Open your terminal or command prompt inside the project folder.
2. Run the following command:
    ```bash
    python -m http.server 8000
    ```
3. Open your web browser and go to: `http://localhost:8000`

### Method 3: Direct File Open
You can simply double-click the `index.html` file in your file explorer to open it directly in Chrome or Edge. *(Note: Some advanced JavaScript features might be restricted by the browser when opened directly via the `file://` protocol).*

---

### 🔑 User Roles & Navigation

*   **Customer Portal:** Starts at `index.html`. Users can register, log in, browse watches, add items to their cart, view their profile, and track orders.
*   **Staff/Admin Portal:** Click the "STAFF PORTAL" link on the login page or navigate directly to `admin/index.html`. Staff can manage the product catalog (CRUD operations), process orders, and view metrics.
