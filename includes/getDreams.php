<?php
// Return dreams data in JSON format
header('Content-Type: application/json; charset=utf-8');

// הגדרות התחברות
$servername = "localhost";
$username = "barzi_admin";
$password = "Raem123!321";
$dbname = "barzi_remory";

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection status
if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

$conn->set_charset("utf8");

// Fetch dreams ordered by date (newest first)
$sql = "SELECT * FROM dreams ORDER BY dream_date DESC";
$result = $conn->query($sql);

$dreamsArray = array();

if ($result->num_rows > 0) {
    // Convert each database row to array element
    while($row = $result->fetch_assoc()) {
        $dreamsArray[] = $row;
    }
}

// Return dreams array as JSON for JavaScript
echo json_encode($dreamsArray);

$conn->close();
?>