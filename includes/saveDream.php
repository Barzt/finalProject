<?php
// Database connection credentials
$server_name = "127.0.0.1";
$user_name = "barzi_admin";
$password = "Raem123!321";
$database_name = "barzi_remory";

// Create database connection
$conn = new mysqli($server_name, $user_name, $password, $database_name);

// Set character encoding for Hebrew support
$conn->set_charset("utf8mb4");

// Check connection status
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Retrieve form data from POST
    $date = $_POST['dreamDate'];
    $lucidity = $_POST['dreamLucidity'];
    $wakeTime = $_POST['wakeTime'];
    $description = $_POST['dreamDescription'];
    
    // Process tags from form checkboxes into comma-separated string
    if (isset($_POST['dreamTags']) && is_array($_POST['dreamTags'])) {
        $tags = implode(", ", $_POST['dreamTags']);
    } else {
        $tags = "";
    }

    // Prepare secure SQL statement and bind parameters
    $stmt = $conn->prepare("INSERT INTO dreams (dream_date, dream_level, wake_time, dream_description, dream_tags) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sisss", $date, $lucidity, $wakeTime, $description, $tags);

    // Save dream to database and check for success
    if ($stmt->execute()) {
        // Save successful, redirect to success page
        header("Location: success.html");
        exit();
    } else {
        // Database error occurred
        echo "Error saving dream: " . $conn->error;
    }

    $stmt->close();
}

$conn->close();
?>