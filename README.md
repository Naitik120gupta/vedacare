**VedaCare**

Our project aims to create a robust health analysis and evaluation system that leverages image and video analysis techniques to assess key physical indicators such as facial and nail characteristics. It is designed to assist Ayurveda experts in offering personalized health insights.

**Key Features Image and Video Capture:** Capture high-quality images and videos of a user's face and nails. Ensure optimal capture conditions with guidance on lighting, angles, and focus.

**Backend techstack:** Django (Python) to develop APIs for data communication. Cloud Services: AWS (Amazon Web Services) flask for ML.

**Purpose:** Present personalized health insights in a user-friendly format. Patients: Receive simple, actionable health recommendations. Experts: Access detailed insights with annotated images, graphs, and visualizations.

**Frontend techstack:** Web App: React components for responsive interfaces. tailwind vite.js.

**Visualization Libraries:** Canvas API for overlays on images/videos. Data Fetching: React Query for managing data fetching and caching on the web.

**End-to-End Workflow Image/Video Capture:** Users capture data using web interfaces with guided instructions. Validations ensure proper quality (e.g, lighting, angles).

**Local Processing:** Features like skin tone or nail texture are analyzed locally for quick feedback. For detailed processing, data is sent to the cloud. Cloud Analysis:

Advanced machine learning models analyze the data for detailed health metrics. Results are stored in a secure, scalable cloud environment.

**Insights Presentation:** Processed data is retrieved and presented on the respective platform. Patients view simplified health insights. Experts access detailed reports for personalized recommendations.
