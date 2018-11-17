const logger = require('app/common/log/logger.service');
const databaseConfiguration = require('configuration/database/database-configuration.service')
const knex = require('knex');
const persistence = knex(databaseConfiguration.persistence);

const categories = ["10+ inch","18-19 years","1 on 1","3d cartoon","3 some","4 some","5some","69","Abandoned house","Accent","Accident","Acrobatic","Adorable","Adultery","African","Aged","Aggressive","Airport","Alien","All holes","Allure","Alternative","Amateurs","Amazing","American","Anal","Anal beads","Anal creampie","Anal finger","Anal first time","Anal fisting","Anal toys","Angry","Anime","Anorexic","Antique","Arab","Argentinian","Armpit","Army","Arrangement","Asian","Ass","Assfucking","Asshole","Ass licking","Assplay","Ass shaking","Ass to mouth","Ass worshiping","Athletic","At work","Aunt","Australian","Austrian","Babe","Babysitter","Backroom","Backseat","Backstage","Balcony","Ballerina","Ball kicking","Ball licking","Balloon","Banana","Banging","Bangkok","Bangladeshi","Bar","Bareback","Barefoot","Barely legal","Baseball bat","Basement","Bath","Bathing","Bathroom","Bbw","Bdsm","Beach","Beach sex","Beautiful","Beaver","Bed","Bedroom","Beer","Behind the scenes","Belly","Belly dancer","Bent over","Best friend","Beurette","Big ass","Big black cock","Big clit","Big cock","Big natural tits","Big nipples","Big pussy","Big pussy lips","Big tits","Biker","Bikini","Bimbo","Birthday","Bisexual","Bitch","Bizarre","Black","Blackmailed","Black mama","Black teen","Blindfolded","Blonde","Blooper","Blowbang","Blowjob","Blue eyes","Blue films","Boat","Bodybuilder","Body painting","Body stockings","Bombshell","Bondage","Boneless","Boobs","Bookworm","Boots","Boss","Bottle","Bouncing boobs","Bound","Boyfriend","Bra","Braces","Brazilian","Bride","British","Brothel","Brown eyes","Brunette","Brutal","Bubble butt","Bukkake","Bulgarian","Bunny","Burglar","Bus","Business woman","Buttplug","Cage","California","Cameltoe","Camping","Canadian","Candid","Caning","Car","Caribbean","Caring","Cartoon","Casting","Catfight","Catsuit","Caucasian","Caught","Celebrity","Centerfold","Cfnm","Chained","Champagne","Changing room","Chastity belt","Cheating","Cheerleader","Chinese","Chocolate","Choking","Christmas","Chubby","Chunky","Church","Cigarette","Cinema","Classic","Classmate","Classroom","Classy","Cleaning lady","Climax","Clit","Close-up","Clothed","Clothes off","Clothes ripped","Clown","Cock","Cock ring","Cock trample","Cock worship","Coed","Coffee shop","College","Colombian","Colorful","Comedy","Comic","Competition","Compilation","Condom","Contest","Corset","Cosplay","Costumes","Cougar","Countertop","Country","Couple","Couple invites","Cousin","Cowgirl","Co worker","Crazy","Creampie","Croatian","Crossdressing","Crotchless","Crying","Cuban","Cuckold","Cucumber","Cum","Cum covered","Cum drenched","Cum farting","Cum in mouth","Cum in pussy","Cum on ass","Cum on face","Cum on her eyes","Cum on tits","Cumshot","Cum swapping","Cunilingus","Cunt","Curly","Curved upwards cock","Curvy","Cute","Czech","Dad and girl","Daddy","Dancing","Danish","Dare","Dating","Deepthroat","Defloration","Delivery boy","Desk","Destroyed ass","Diaper","Dildo","Dirty","Dirty talk","Disgrace","Doctor","Doggystyle","Domination","Dominican","Dorm","Double","Double penetration","Double vaginal","Downblouse","Dream girl","Dress","Drilled","Dripping","Dropped towel","Drugged","Drunk","Dutch","Early morning","Ebony","Egyptian","Electro","Elevator","Emo","Enema","Erotic","Escorts","Estonian","Ethnic","Euro glamour","European","Exam","Exclusive","Ex girlfriend","Exhibitionists","Exotic","Experienced","Exploited","Extreme","Eye rolling","Face fucking","Face sitting","Facial","Fake tits","Fantasy","Farting","Fat","Father-in-law","Feet","Female choice","Female ejaculation","Femdom","Fetish","Ffm","Fight","Filipina","Financial domination","Fingering","Finnish","Firm tits","First time","Fishnets","Fisting","Fitness","Flaccid fellow","Flashing","Flat chested","Fleshlight","Flexible","Flight","Flip flops","Florida","Food","Footjob","Foreign","Foreplay","Forest","Forgive me","French","Friend","Friend's mom","Fuck doll","Fucking","Full movie","Furry","Futanari","Gagging","Game","Gangbang","Gaping","Garage","Garden","Garter belt","Gas station","Gay","Gear shift","German","Ghetto","Girdle","Girlfriend","Girl fucks guy","Girl next door","Girl on girl","Girls kissing","Give thanks","Glamour","Glasses","Gloryhole","Gloves","Goddess","Goes wrong","Golden shower","Gopro","Goth","Grandfather","Grandmother","Granny","Greek","Grinding","Groping","Group","Guadeloupe","Gym","Gymnast","Gyno exam","Gypsy","Hairless","Hair pulling","Hairstyle","Hairy","Halloween","Handcuffs","Handjob","Hardcore","Hates cum","Heels","Hentai","Hidden","Hidden cam","High definition","Hippy","Hirsute","Hitchhiker","Hogtied","Holiday","Homeless","Homemade","Hood","Hooker","Hooters","Horny","Hospital","Hotel","Housewife","Huge","Humiliation","Hungarian","Hunk","Husband","Husband's friend","Husband watches","Ibiza","Indian","Indonesian","Innocent","Insertion","Instruction","Interactive","Interracial","Interview","Intimate","Iranian","Irish","Israeli","Italian","Jacuzzi","Japanese","Jav","Jeans","Jerking off","Jerk off instructions","Jewish","Jizz","Juicy","Jumping tits","Jungle","Kinky","Kissing","Kitchen","Korean","Lactating","Lady","Ladyboy","Lap dance","Latex","Latina","Latvian","Leather","Leggings","Legs","Lesbian","Lezdom","Lick","Lingerie","Lipstick","Liquid lunch","Lithuanian","Long hair","Long legs","Long nails","Lover","Lucky","Machine","Maid","Malaysian","Maledom","Mardi gras","Married","Masked","Massage","Masseuse","Master","Masturbation","Mature","Melons","Messy","Mexican","Mff","Midget","Milf","Military","Milk","Miniskirt","Mirror","Missionary","Mistress","Mmf","Moaning","Model","Mom and boy","Mommy","Monster","Monster cock","Moroccan","Mother-in-law","Mother's friend","Mouthful","Muff diving","Mummification","Muscular","Music","Mutual masturbation","Naked","Narrow ass","Nasty","Natural tits","Nature","Naughty","Needle","Neighbors","Nerd","Nervous","New zealand","Night club","Nipples","Norwegian","No sex","Not brother","Not daughter","Not sister","Not son","Nude","Nudist","Nun","Nurse","Nuru massage","Nylon","Nympho","Obese","Office","Oiled","Old","Old and young","Old man","Old woman","On her knees","On the bench","Oops!!!","Oral","Orgasm","Orgy","Oriental","Outdoor","Outfit","Pain","Pakistani","Panties","Pantyhose","Panty sniffing","Parody","Party","Passionate","Patient","Penis","Perfect body","Perky","Persian","Peruvian","Petite","Phone","Phone sex","Photoshoot","Piano","Pickup","Pierced nipples","Piercing","Pigtails","Plump","Police","Polish","Ponytail","Pool","Porn in 3d","Pornstar","Portuguese","Posing","Pov","Pregnant","Pretty","Princess","Prison","Private","Prostitute","Public","Puerto rican","Puffy","Punished","Punk","Pussy","Pussy lips","Pussy stretching","Quickie","Rabbit toy","Ranch","Raunchy","Real doll","Reality","Rectal exam","Redhead","Relax","Repairman","Restaurant","Retro","Revenge","Rich","Riding","Rimjob","Ring gag","Roleplay","Romanian","Romantic","Rooftop sex","Roommate","Rough","Rubber","Russian","Sadism","Saggy tits","Sailor","Saliva","Satin","Sauna","Scandal","Scandinavian","Schoolboy","Schoolgirl","Scissoring","Scottish","Scratches","Screaming","Secretary","Seduction","See through","Self sucking","Sensual","Serbian","Sex","Sex confessions","Sex for cash","Sex tape","Sexy","Share","Shaved","Shaved pussy","Shemale","Shoes","Shop","Short hair","Shorts","Shower","Shy","Side by side","Sideways","Silicone","Silk","Silly","Skinny","Skirt","Slap","Slave","Sleeping","Sloppy","Slovakian","Slovenian","Slow motion","Slut","Small cock","Small tits","Small waist","Smoking","Smother","Sneakers","Snow","Snowballing","Socks","Sofa","Softcore","Solo","Son's friend","Son's girlfriend","Sorority","Spandex","Spanish","Spanking","Speculum","Spitting","Spooning","Sport","Spreading","Spring break","Spying","Squirting","Sri lankan","Stewardess","Stinging nettle","Stockings","Stoned","Storyline","Strapon","Street","Stretching","Striptease","Student","Stylish","Submission","Submissive","Sucking","Swallow","Swedish","Swingers","Swollen pussy","Sybian","Taboo","Taiwanese","Tall","Tan lines","Tanned","Targeted","Tattoo","Taxi","Teacher","Teasing","Teen","Tentacle","Tgirl","Thai","Thief caught","Thinking about","Thong","Tickling","Tied up","Tight","Tight clothing","Tight pussy","Tits","Titty fuck","Toes","Toilet","Tokyo","Tongue","Topless","Torture","Tourist","Toys","Train","Transsexual","Tribbing","Tricked","Trimmed pussy","Truth or dare","Turkish","Twink","Twins","Ugly","Ukrainian","Uncensored","Uncle","Underwater","Underwear","Undressing","Uniform","University","Unshaved","Upper class","Upskirt","Usa","Vacuum","Vagina","Venezuelan","Vibrator","Vietnamese","Vintage","Virgin","Voyeur","Wanking","Warehouse","Watching","Webcam","Web chat","Wedding","Wet","Wet pussy","Wet t-shirt","Whipping","Whore","Wife","Wife's friend","Wife swap","Wig","Workout","Wrapped bondage","Wrestling","Wrinkled","Wrong hole","Xs girls","Xxl","Yacht","Yoga","Young"];


async function emptyDatabase(shallExit) {
  const clearingSQL = `    
    do
     $$
      declare
        l_stmt text;
      begin 
        select 'truncate ' || string_agg(format('%I.%I', schemaname, tablename), ',')
        into l_stmt 
        from pg_tables
        where schemaname in ('public') and 
        tablename not in ('knex_migrations', 'knex_migrations_lock');
        execute l_stmt;
      end;
      $$
  `;
  try {
    await persistence.raw(clearingSQL);
    logger.info('Successful clearing');
    if(shallExit) {
      process.exit();
    }
  } catch(error) {
    logger.error('Database error');
    logger.log({level: 'error', message: error});
    process.exit(-1);
  }
}
async function seedInitial() {
  await emptyDatabase();
  async function transaction(t) {
    const insertRolesSQL = `
        INSERT INTO "public"."role"(name) VALUES ('administrator'), ('user');
      `;
    const insertAdministratorSQL = `
        WITH inserted_admin AS (
          INSERT INTO "public"."user" (email, first_name, last_name) VALUES ('administrator@test.com', 'Test', 'Administrator') RETURNING id
        ), inserted_admin_roles AS (
           INSERT INTO "public"."users_roles" (user_id, role_id)
               SELECT (SELECT id FROM inserted_admin), (SELECT id FROM "public"."role" WHERE name = 'administrator')
        )
        INSERT INTO "public"."security" 
        
        SELECT
         id,
         '9c46dbec5d03f74352cc4a4da354b4e9796887eeb66ac292617692e765dbe400352559b16229f97b27614b51dbfbbb14613f2c10350435a8feaf53f73ba01c7c',
         '9c46dbec5d03f74352cc4a4da354b4e9796887eeb66ac292617692e765dbe400352559b16229f97b27614b51dbfbbb14613f2c10350435a8feaf53f73ba01c7a',
          true,
          false,
          NOW() 
        FROM inserted_admin;`;
    const insertCategoriesSQL = `
      INSERT INTO "public"."category" ( name ) VALUES ${categories.map(() => '(?)').join(', ')}    `

    await t.raw(insertRolesSQL);
    await t.raw(insertAdministratorSQL);
    await t.raw(insertCategoriesSQL, categories);
  }

  try {
    await persistence.transaction(transaction);
    logger.info('Successful seeding');
    process.exit();
  } catch(error) {
    console.error(error);
    logger.error('Database error');
    logger.error(error);
    process.exit(-1);
  }
}

switch(process.argv[2]) {
  case 'clear':
    emptyDatabase(true);
    break;
  case 'initial':
    seedInitial();
    break;
  default:
    logger.warn('Available options');
    logger.warn('clear');
    logger.warn('initial');
}