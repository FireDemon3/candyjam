<?php
require __DIR__ . '/vendor/autoload.php';


/*
 * We need to get a Google_Client object first to handle auth and api calls, etc.
 */
$client = new \Google_Client();
$client->setApplicationName('My Game Stats Api');
$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
$client->setAccessType('offline');

/*
 * The JSON auth file can be provided to the Google Client in two ways, one is as a string which is assumed to be the
 * path to the json file. This is a nice way to keep the creds out of the environment.
 *
 * The second option is as an array. For this example I'll pull the JSON from an environment variable, decode it, and
 * pass along.
 */
$client->setAuthConfig(__DIR__ . '/../../Candyjam-b9567b74bae3.json');

/*
 * With the Google_Client we can get a Google_Service_Sheets service object to interact with sheets
 */
$sheets = new \Google_Service_Sheets($client);

// Specify the ID of the sheet to use, it's part of the sheet URL.
// https://docs.google.com/spreadsheets/d/1r2tqX7hcjEbUT7_Q2CWZjd4zxS77kf8XVETvDOkPKHA/edit#gid=170607573
$spreadsheetId = '1r2tqX7hcjEbUT7_Q2CWZjd4zxS77kf8XVETvDOkPKHA';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // The request is using the POST method

    $sheet = "regular";
    if (isset($_POST['mode'])) {
        $sheet = "addicting";
    }
    $player = $_POST['player'];
    $playerUq = $_POST['player_uq'];
    $duration = (int)$_POST['duration'];
    $score = (int)$_POST['score'];
    $win = $_POST['win'];
    
    if ($player) {
        $range = "{$sheet}!A2:F";
        $valueRange = new Google_Service_Sheets_ValueRange();
        $valueRange->setValues(["values" => [$player, $playerUq, $duration, $score, $win]]); 
        $conf = ["valueInputOption" => "RAW"];
        // $ins = ["insertDataOption" => "INSERT_ROWS"];
        $sheets->spreadsheets_values->append($spreadsheetId, $range, $valueRange, $conf); //, $ins

        $result = ["result" => "Inserted"];  
    } else {
        $result = ["result" => "NoPlayer"];  
    }
    // Return in JSON (easily used by JavaScript Ajax)
    print_r(json_encode($result, JSON_FORCE_OBJECT));

    die();
}


// **************************************************
// Get the High Scores
// **************************************************
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    /*
    * To read data from a sheet we need the spreadsheet ID and the range of data we want to retrieve.
    * Range is defined using A1 notation, see https://developers.google.com/sheets/api/guides/concepts#a1_notation
    */
    $data = [];
    
    $sheet = "regular";
    if (isset($_GET['mode'])) {
        $sheet = "addicting";
    }

    // The sheet name and range of A2:D will get columns A through D and all rows starting from row 2.
    $range = "{$sheet}!A2:E";

    $rows = $sheets->spreadsheets_values->get($spreadsheetId, $range, ['majorDimension' => 'ROWS']);
    if (isset($rows['values'])) {
        foreach ($rows['values'] as $row) {
            /*
            * If first column is empty, consider it an empty row and skip (this is just for example)
            */
            if (empty($row[0])) {
                break;
            }

            $data[] = [
                'player' => $row[0],
                // 'player_uq' => $row[1],
                // 'duration' => (int)$row[2],
                'score' => (int)$row[3],
                // 'win' => $row[4],
            ];

        }
    }

    // Sort play scores, highest to lowest
    usort($data, function($a, $b) {
        if ($a['score'] == $b['score']) {
            return 0;
        }
        return ($a['score'] > $b['score']) ? -1 : 1;
    });

    // Return only the top 10.
    $highScores = array_slice($data, 0, 10);

    // Return in JSON (easily used by JavaScript Ajax)
    print_r(json_encode($highScores, JSON_FORCE_OBJECT));
    die();
}
