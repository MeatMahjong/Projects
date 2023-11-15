var range = 250;
var counts = new int[range];
var text = "something";

Console.WriteLine("Skriv noe, så teller jeg opp : ");
while (!string.IsNullOrWhiteSpace(text))
{
    // text = Console.ReadLine();
    // Endret denne ved å legge til .ToLower på høyre side
    text = Console.ReadLine().ToLower();
    foreach (var character in text ?? string.Empty) counts[character]++;
    for (var i = 0; i < range; i++)
        if (counts[i] > 0)
        {
            var character = (char)i;
            Console.WriteLine(character + " og/eller " + char.ToUpper(character) + " ble skrevet " + counts[i] + " ganger.");
        }
    Console.WriteLine("--------------------------------------------------------");
    Console.WriteLine("Skriv noe nytt, så gjør vi det igjen:");
}

//Oppgave 315 A  
//    Lag en konsollapplikasjon og legg inn koden under og test ut hva koden gjør.
// Endre så til at store og små bokstaver håndteres likt => La til .ToLower 
//
//Oppgave 315 B  
// Skriv koden bedre ved hjelp av refactoring
////////////////////////////////////////////////////////////
// UTGANGSPUNKTET: 
/// Valgte markere alt -> Hammer > Reformat and Cleanup > Full cleanup
//var range = 250;
//var counts = new int[range];
//string text = "something";

//Console.WriteLine("Skriv noe, så teller jeg opp : ");
//while (!string.IsNullOrWhiteSpace(text))
//{
//    // text = Console.ReadLine();
//    // Endret denne ved å legge til .ToLower på høyre side
//    text = Console.ReadLine().ToLower();
//    foreach (var character in text ?? string.Empty)
//    {
//        counts[(int)character]++;
//    }
//    for (var i = 0; i < range; i++)
//    {
//        if (counts[i] > 0)
//        {
//            var character = (char)i;
//            Console.WriteLine(character + " - " + counts[i]);
//        }
//    }
//}
///////////////////////////////////////////////////////
///
///