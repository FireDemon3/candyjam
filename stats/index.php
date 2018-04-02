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

    print_r("hey");
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
                // 'start_date' => $row[2],
                // 'end_date' => $row[3],
                'score' => (int)$row[4],
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


// The sheet name and range of A2:D will get columns A through D and all rows starting from row 2.
$range = 'regular!A2:D';


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
            'col-a' => $row[0],
            'col-b' => $row[1],
            'col-c' => $row[2],
            'col-d' => $row[3],
            // 'col-e' => $row[4],
            // 'col-f' => $row[5],
            // 'col-g' => $row[6],
            // 'col-h' => $row[7],
        ];

        /*
         * Now for each row we've seen, lets update the I column with the current date
         */
        $updateRange = 'I'.$currentRow;
        $updateBody = new \Google_Service_Sheets_ValueRange([
            'range' => $updateRange,
            'majorDimension' => 'ROWS',
            'values' => ['values' => date('c')],
        ]);
        $sheets->spreadsheets_values->update(
            $spreadsheetId,
            $updateRange,
            $updateBody,
            ['valueInputOption' => 'USER_ENTERED']
        );

        $currentRow++;
    }
}

print_r("data is ");
print_r($data);
/* Output:
Array
(
    [0] => Array
        (
            [col-a] => 123
            [col-b] => test
            [col-c] => user
            [col-d] => test user
            [col-e] => usertest
            [col-f] => email@domain.com
            [col-g] => yes
            [col-h] => no
        )
    [1] => Array
        (
            [col-a] => 1234
            [col-b] => another
            [col-c] => user
            [col-d] =>
            [col-e] => another
            [col-f] => another@eom.com
            [col-g] => no
            [col-h] => yes
        )
)
 */