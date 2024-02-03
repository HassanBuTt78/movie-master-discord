# Movie Master Discord Bot
**Movie Master is  a simple bot that can help you to watch and download movies for free from within Discord in easy 2 clicks.**  
You can invite bot in your server using this link: https://bit.ly/Movie-Master-  
Website: https://movie-master.uk.to

---

# Setup Guide
### Install Dependencies
```
 npm install 
```
Installs All the dependencies for the discord bot.

### Setting Envirnment Variables
1. Make a ".env" file in the root directory.
2. Set the following variables as your requirements. (Refer to .env.example)
```
## ESSENTIAL
TOKEN=Your_Discord_bot_token
CLIENT_ID=Your_discord_bot_client_Id

## OPTIONAL
## Add These Only If you want "/stats" command with your bot. 
DATABASE=uri/of/your/mongodb/database
STATS_DOCUMENT_ID=Id_of_the_document_to_store_stats


## TOP.GG STATS
## Add it only if your want stats in your top.gg page.
DBLTOKEN=Your_top.gg_dbl_token

```
**Note:**  Bot only need `TOKEN` and `CLIENT_ID` to work.

### Running Bot
```
npm run start
```
It will start the bot on your token


### Customizing Bot Responses

-   **Changing the Welcome Message:**
    
    -   Navigate to `events > guildCreate.js` and modify the `welcomeMessage` according to your preference.
-   **Changing Style and Links in Responses:**
    
    -   Go to `utils > resultParser.js` to modify the template color, text, links, and icons to suit your preferences.
-   **Changing the Bot's Activity:**
    
    -   Open `events > ready.js` and update the activity to your liking.

## Note
The project is badly structured. Don't mind it, please. (it's old)
