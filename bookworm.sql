--
-- PostgreSQL database dump
--

-- Dumped from database version 10.15 (Ubuntu 10.15-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.15 (Ubuntu 10.15-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: books; Type: TABLE; Schema: public; Owner: vagrant
--

CREATE TABLE public.books (
    isbn character varying(13) NOT NULL,
    title text NOT NULL,
    author character varying(50) NOT NULL,
    description text,
    page_length integer NOT NULL,
    image character varying
);


ALTER TABLE public.books OWNER TO vagrant;

--
-- Name: books_categories; Type: TABLE; Schema: public; Owner: vagrant
--

CREATE TABLE public.books_categories (
    id integer NOT NULL,
    isbn character varying(13),
    category_id integer
);


ALTER TABLE public.books_categories OWNER TO vagrant;

--
-- Name: books_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: vagrant
--

CREATE SEQUENCE public.books_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_categories_id_seq OWNER TO vagrant;

--
-- Name: books_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vagrant
--

ALTER SEQUENCE public.books_categories_id_seq OWNED BY public.books_categories.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: vagrant
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    user_id integer,
    label character varying(50) NOT NULL
);


ALTER TABLE public.categories OWNER TO vagrant;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: vagrant
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO vagrant;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vagrant
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: vagrant
--

CREATE TABLE public.events (
    id integer NOT NULL,
    host_id integer,
    city character varying(30) NOT NULL,
    state character varying(2),
    event_date date NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    is_private boolean,
    can_add_books boolean,
    can_vote boolean
);


ALTER TABLE public.events OWNER TO vagrant;

--
-- Name: events_attendees; Type: TABLE; Schema: public; Owner: vagrant
--

CREATE TABLE public.events_attendees (
    id integer NOT NULL,
    user_id integer,
    event_id integer,
    is_attending boolean,
    voted_for character varying
);


ALTER TABLE public.events_attendees OWNER TO vagrant;

--
-- Name: events_attendees_id_seq; Type: SEQUENCE; Schema: public; Owner: vagrant
--

CREATE SEQUENCE public.events_attendees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_attendees_id_seq OWNER TO vagrant;

--
-- Name: events_attendees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vagrant
--

ALTER SEQUENCE public.events_attendees_id_seq OWNED BY public.events_attendees.id;


--
-- Name: events_books; Type: TABLE; Schema: public; Owner: vagrant
--

CREATE TABLE public.events_books (
    id integer NOT NULL,
    isbn character varying(13),
    event_id integer,
    vote_count integer,
    is_the_one boolean
);


ALTER TABLE public.events_books OWNER TO vagrant;

--
-- Name: events_books_id_seq; Type: SEQUENCE; Schema: public; Owner: vagrant
--

CREATE SEQUENCE public.events_books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_books_id_seq OWNER TO vagrant;

--
-- Name: events_books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vagrant
--

ALTER SEQUENCE public.events_books_id_seq OWNED BY public.events_books.id;


--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: vagrant
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO vagrant;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vagrant
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: friendships; Type: TABLE; Schema: public; Owner: vagrant
--

CREATE TABLE public.friendships (
    id integer NOT NULL,
    requestor_id integer,
    is_friend boolean,
    pending boolean
);


ALTER TABLE public.friendships OWNER TO vagrant;

--
-- Name: friendships_id_seq; Type: SEQUENCE; Schema: public; Owner: vagrant
--

CREATE SEQUENCE public.friendships_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.friendships_id_seq OWNER TO vagrant;

--
-- Name: friendships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vagrant
--

ALTER SEQUENCE public.friendships_id_seq OWNED BY public.friendships.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: vagrant
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(25) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(120) NOT NULL,
    password_hash character varying(128),
    city character varying(30),
    state character varying(2),
    is_searchable boolean
);


ALTER TABLE public.users OWNER TO vagrant;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: vagrant
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO vagrant;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vagrant
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: books_categories id; Type: DEFAULT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.books_categories ALTER COLUMN id SET DEFAULT nextval('public.books_categories_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: events_attendees id; Type: DEFAULT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.events_attendees ALTER COLUMN id SET DEFAULT nextval('public.events_attendees_id_seq'::regclass);


--
-- Name: events_books id; Type: DEFAULT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.events_books ALTER COLUMN id SET DEFAULT nextval('public.events_books_id_seq'::regclass);


--
-- Name: friendships id; Type: DEFAULT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.friendships ALTER COLUMN id SET DEFAULT nextval('public.friendships_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: vagrant
--

COPY public.books (isbn, title, author, description, page_length, image) FROM stdin;
F7IqEFlwXkkC	Nicholas Nickleby	Charles Dickens 	Features characters that range from the iniquitous Wackford Squeers and his family, to the delightful Mrs Nickleby, taking in the eccentric Crummles and his travelling players, the Mantalinis, the Kenwigs, and many more.	800	http://books.google.com/books/content?id=F7IqEFlwXkkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
XV8XAAAAYAAJ	Moby Dick	Herman Melville 	A literary classic that wasn't recognized for its merits until decades after its publication, Herman Melville's Moby-Dick tells the tale of a whaling ship and its crew, who are carried progressively further out to sea by the fiery Captain Ahab. Obsessed with killing the massive whale, which had previously bitten off Ahab's leg, the seasoned seafarer steers his ship to confront the creature, while the rest of the shipmates, including the young narrator, Ishmael, and the harpoon expert, Queequeg, must contend with their increasingly dire journey. The book invariably lands on any short list of the greatest American novels.	545	http://books.google.com/books/content?id=XV8XAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
s1gVAAAAYAAJ	Pride and Prejudice	Jane Austen 	Austen’s most celebrated novel tells the story of Elizabeth Bennet, a bright, lively young woman with four sisters, and a mother determined to marry them to wealthy men. At a party near the Bennets’ home in the English countryside, Elizabeth meets the wealthy, proud Fitzwilliam Darcy. Elizabeth initially finds Darcy haughty and intolerable, but circumstances continue to unite the pair. Mr. Darcy finds himself captivated by Elizabeth’s wit and candor, while her reservations about his character slowly vanish. The story is as much a social critique as it is a love story, and the prose crackles with Austen’s wry wit.	401	http://books.google.com/books/content?id=s1gVAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
VHKeKCeJm84C	Tess of the D'Urbervilles	Thomas Hardy 	"I would be content, ay, glad, to live with you as your servant, if I may not as your wife; so that I could only be near you, and get glimpses of you, and think of you as mine ... I long for only one thing in heaven or earth or under the earth, to meet you, my own dear! Come to me - come to me, and save me from what threatens me!" When Tess Durbeyfield is driven by family poverty to claim kinship with the wealthy D'Urbervilles and seek a portion of their family fortune, meeting her 'cousin' Alec proves to be her downfall. A very different man, Angel Clare, seems to offer her love and salvation, but Tess must choose whether to reveal her past or remain silent in the hope of a peaceful future. With its sensitive depiction of the wronged Tess and powerful criticism of social convention, Tess of the D'Urbervilles is one of the most moving and poetic of Hardy's novels. The Penguin English Library - 100 editions of the best fiction in English, from the eighteenth century and the very first novels to the beginning of the First World War.	496	http://books.google.com/books/content?id=VHKeKCeJm84C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
-xyzCwAAQBAJ	The Invisible Man	H.G. Wells 	THE INVISIBLE MAN tells the story of Griffin, a brilliant and obsessed scientist dedicated to achieving invisibility. Taking whatever action is necessary to keep his incredible discovery safe, he terrorises the local village where he has sought refuge. Wells skilfully weaves the themes of science, terror and pride as the invisible Griffin gradually loses his sanity and, ultimately, his humanity.	160	http://books.google.com/books/content?id=-xyzCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
oGUPnwEACAAJ	The Grapes of Wrath	John Steinbeck 	Shocking and controversial when it was first published in 1939, Steinbeck's Pulitzer prize-winning epic remains his undisputed masterpiece. It tells of the Joad family who travel West in search of the promised land, and find only broken dreams.	678	http://books.google.com/books/content?id=oGUPnwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
3zx9PwAACAAJ	The Grapes of Wrath	John Steinbeck Susan Shillinglaw 	This is Steinbeck's Pulitzer Prize-winning novel of the plight of the Okies, the refugee farmers and sharecroppers fleeing the dustbowl of Oklahoma. Attracted by the golden promise of California, they meet only abject hostility, shame and destitution.	601	http://books.google.com/books/content?id=3zx9PwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
_NRmDwAAQBAJ	The Old Man and The Sea	Ernest Hemingway 	A short heroic novel by Ernest Hemingway is a story that centers on an aging fisherman who engages in an epic battle to catch a giant marlin It was published in 1952 and awarded the 1953 Pulitzer Prize for fiction. Author: Ernest Hemingway Genre: Novel	128	http://books.google.com/books/content?id=_NRmDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
ggbLDwAAQBAJ	Matilda	Roald Dahl 	Now a musical! Matilda is a sweet, exceptional young girl, but her parents think she's just a nuisance. She expects school to be different but there she has to face Miss Trunchbull, a menacing, kid-hating headmistress. When Matilda is attacked by the Trunchbull she suddenly discovers she has a remarkable power with which to fight back. It'll take a superhuman genius to give Miss Trunchbull what she deserves and Matilda may be just the one to do it! Here is Roald Dahl's original novel of a little girl with extraordinary powers. This much-loved story has recently been made into a wonderful new musical, adapted by Dennis Kelly with music and lyrics by Tim Minchin.	192	http://books.google.com/books/content?id=ggbLDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
aWypDwAAQBAJ	Animal Farm	George Orwell 	A beautiful graphic adaptation of George Orwell's timeless and timely allegorical novel. "All animals are equal, but some animals are more equal than others." In 1945, George Orwell, called "the conscience of his generation," created an enduring, devastating story of new tyranny replacing old, and power corrupting even the noblest of causes. Today it is all too clear that Orwell's masterpiece is still fiercely relevant wherever cults of personality thrive, truths are twisted by those in power, and freedom is under attack. Now, in this fully authorized edition, the artist Odyr translates the world and message of Animal Farm into a gorgeously imagined graphic novel. Old Major, Napoleon, Squealer, Snowball, Boxer, and all the animals of Animal Farm come to life in this newly envisaged classic. From his individual brushstrokes to the freedom of his page design, Odyr's adaptation seamlessly moves between satire and fable and will appeal to all ages, just as Orwell intended.	176	http://books.google.com/books/content?id=aWypDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
_luMDQAAQBAJ	The Sound and the Fury	William Faulkner 	Design manuscript, setting copy, four galley proofs, page proof, blue line and two reproduction proofs for the corrected edition of the novel edited by Noel Polk.	326	http://books.google.com/books/content?id=_luMDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
0BPNBAAAQBAJ	Beauty	Robin McKinley 	The New York Times–bestselling author of Rose Daughter reimagines the classic French fairy tale of Beauty and the Beast. I was the youngest of three daughters. Our literal-minded mother named us Grace, Hope, and Honour. . . . My father still likes to tell the story of how I acquired my odd nickname: I had come to him for further information when I first discovered that our names meant something besides you-come-here. He succeeded in explaining grace and hope, but he had some difficulty trying to make the concept of honour understandable to a five-year-old. . . . I said: ‘Huh! I’d rather be Beauty.’ . . . By the time it was evident that I was going to let the family down by being plain, I’d been called Beauty for over six years. . . . I wasn’t really very fond of my given name, Honour, either . . . as if ‘honourable’ were the best that could be said of me. The sisters’ wealthy father loses all his money when his merchant fleet is drowned in a storm, and the family moves to a village far away. Then the old merchant hears what proves to be a false report that one of his ships had made it safe to harbor at last, and on his sad, disappointed way home again he becomes lost deep in the forest and has a terrifying encounter with a fierce Beast, who walks like a man and lives in a castle. The merchant’s life is forfeit, says the Beast, for trespass and the theft of a rose—but he will spare the old man’s life if he sends one of his daughters: “Your daughter would take no harm from me, nor from anything that lives in my lands.” When Beauty hears this story—for her father had picked the rose to bring to her—her sense of honor demands that she take up the Beast’s offer, for “cannot a Beast be tamed?” This “splendid story” by the Newbery Medal–winning author of The Hero and the Crown has been named an ALA Notable Book and a Phoenix Award Honor Book (Publishers Weekly).	328	http://books.google.com/books/content?id=0BPNBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
Jy8S_9fN5wAC	The Secret of the Old Clock	Carolyn Keene 	Nancy Drew's keen mind is tested when she searches for a missing will.	180	http://books.google.com/books/content?id=Jy8S_9fN5wAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
AupU4dGrst0C	Brighton Rock	Graham Greene 	"WITH AN INTRODUCTION BY J.M. COETZEE A gang war is raging through the dark underworld of Brighton. Seventeen-year-old Pinkie, malign and ruthless, has killed a man. Believing he can escape retribution, he is unprepared for the courageous, life-embracing Ida Arnold. Greene's gripping thriller, exposes a world of loneliness and fear, of life lived on the dangerous edge of things'. 'In a class by himself-the ultimate chronicler of twentieth-century man's consciousness and anxiety' - William Golding, Independent The most ingenious, inventive and exciting of our novelists, rich in exactly etched and moving portraits of real human beings - The Times read Brighton Rock when I was about thirteen. One of the first lessons I took from it was that a serious novel could be an exciting novel that the novel of adventure could also be the novel of ideas - Ian McEwan"	269	http://books.google.com/books/content?id=AupU4dGrst0C&printsec=frontcover&img=1&zoom=1&source=gbs_api
hB0PswEACAAJ	The Good Companions	J. B. Priestley 	Set in England during the 1920s, 'The Good Companions' follows the adventures, antics and disappointments of a troupe of thespians as they sing, dance, drink and squabble their way from theatre to theatre.	528	http://books.google.com/books/content?id=hB0PswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
vPNaAAAAMAAJ	Kim	Rudyard Kipling 	Young disciple of an old Lama, street Arab and apprentice in the secret service, receives an unique education in shady walks of Anglo-Indian life.	265	http://books.google.com/books/content?id=vPNaAAAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
rR0ZEAAAQBAJ	Jane Eyre	Charlotte Brontë 	Jane Eyre experienced abuse at a young age, not only from her aunt—who raised her after both her parents died—but also from the headmaster of Lowood Institution, where she is sent away to. After ten years of living and teaching at Lowood Jane decides she is ready to see more of the world and takes a position as a governess at Thornfield Hall. Jane later meets the mysterious master of Thornfield Hall, Mr. Rochester, and becomes drawn to him. Charlotte Brontë published Jane Eyre: An Autobiography on October 16th 1847 using the pen name “Currer Bell.” The novel is known for revolutionizing prose fiction, and is considered to be ahead of its time because of how it deals with topics of class, religion, and feminism. This book is part of the Standard Ebooks project, which produces free public domain ebooks.	0	http://books.google.com/books/content?id=rR0ZEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
swJWQ5qq804C	Harry Potter and the Prisoner of Azkaban	J. K. Rowling 	During his third year at Hogwarts School for Witchcraft and Wizardry, Harry Potter must confront the devious and dangerous wizard responsible for his parents' deaths.	435	http://books.google.com/books/content?id=swJWQ5qq804C&printsec=frontcover&img=1&zoom=1&source=gbs_api
BcG2dVRXKukC	The Name of the Wind	Patrick Rothfuss 	'This is a magnificent book' Anne McCaffrey 'I was reminded of Ursula K. Le Guin, George R. R. Martin, and J. R. R. Tolkein, but never felt that Rothfuss was imitating anyone' THE TIMES 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep. My name is Kvothe. You may have heard of me' So begins the tale of Kvothe - currently known as Kote, the unassuming innkeepter - from his childhood in a troupe of traveling players, through his years spent as a near-feral orphan in a crime-riddled city, to his daringly brazen yet successful bid to enter a difficult and dangerous school of magic. In these pages you will come to know Kvothe the notorious magician, the accomplished thief, the masterful musician, the dragon-slayer, the legend-hunter, the lover, the thief and the infamous assassin.	672	http://books.google.com/books/content?id=BcG2dVRXKukC&printsec=frontcover&img=1&zoom=1&source=gbs_api
dLo_GyEykjQC	The Wise Man's Fear	Patrick Rothfuss 	Discover #1 New York Times-bestselling Patrick Rothfuss’ epic fantasy series, The Kingkiller Chronicle. “I just love the world of Patrick Rothfuss.” —Lin-Manuel Miranda • “He’s bloody good, this Rothfuss guy.” —George R. R. Martin • “Rothfuss has real talent.” —Terry Brooks DAY TWO: THE WISE MAN’S FEAR “There are three things all wise men fear: the sea in storm, a night with no moon, and the anger of a gentle man.” My name is Kvothe. You may have heard of me. So begins a tale told from his own point of view—a story unequaled in fantasy literature. Now in The Wise Man’s Fear, Day Two of The Kingkiller Chronicle, Kvothe takes his first steps on the path of the hero and learns how difficult life can be when a man becomes a legend in his own time. Praise for The Kingkiller Chronicle: “The best epic fantasy I read last year.... He’s bloody good, this Rothfuss guy.” —George R. R. Martin, New York Times-bestselling author of A Song of Ice and Fire “Rothfuss has real talent, and his tale of Kvothe is deep and intricate and wondrous.” —Terry Brooks, New York Times-bestselling author of Shannara "It is a rare and great pleasure to find a fantasist writing...with true music in the words." —Ursula K. Le Guin, award-winning author of Earthsea "The characters are real and the magic is true.” —Robin Hobb, New York Times-bestselling author of Assassin’s Apprentice "Masterful.... There is a beauty to Pat's writing that defies description." —Brandon Sanderson, New York Times-bestselling author of Mistborn	1120	http://books.google.com/books/content?id=dLo_GyEykjQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
QVn-CgAAQBAJ	The Way of Kings	Brandon Sanderson 	Introduces the world of Roshar through the experiences of a war-weary royal compelled by visions, a highborn youth condemned to military slavery, and a woman who is desperate to save her impoverished house.	1007	http://books.google.com/books/content?id=QVn-CgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
t_ZYYXZq4RgC	Mistborn	Brandon Sanderson 	From #1 New York Times bestselling author Brandon Sanderson, the Mistborn series is a heist story of political intrigue and magical, martial-arts action. For a thousand years the ash fell and no flowers bloomed. For a thousand years the Skaa slaved in misery and lived in fear. For a thousand years the Lord Ruler, the "Sliver of Infinity," reigned with absolute power and ultimate terror, divinely invincible. Then, when hope was so long lost that not even its memory remained, a terribly scarred, heart-broken half-Skaa rediscovered it in the depths of the Lord Ruler's most hellish prison. Kelsier "snapped" and found in himself the powers of a Mistborn. A brilliant thief and natural leader, he turned his talents to the ultimate caper, with the Lord Ruler himself as the mark. Kelsier recruited the underworld's elite, the smartest and most trustworthy allomancers, each of whom shares one of his many powers, and all of whom relish a high-stakes challenge. Only then does he reveal his ultimate dream, not just the greatest heist in history, but the downfall of the divine despot. But even with the best criminal crew ever assembled, Kel's plan looks more like the ultimate long shot, until luck brings a ragged girl named Vin into his life. Like him, she's a half-Skaa orphan, but she's lived a much harsher life. Vin has learned to expect betrayal from everyone she meets, and gotten it. She will have to learn to trust, if Kel is to help her master powers of which she never dreamed. This saga dares to ask a simple question: What if the hero of prophecy fails? Other Tor books by Brandon Sanderson The Cosmere The Stormlight Archive The Way of Kings Words of Radiance Edgedancer (Novella) Oathbringer The Mistborn trilogy Mistborn: The Final Empire The Well of Ascension The Hero of Ages Mistborn: The Wax and Wayne series Alloy of Law Shadows of Self Bands of Mourning Collection Arcanum Unbounded Other Cosmere novels Elantris Warbreaker The Alcatraz vs. the Evil Librarians series Alcatraz vs. the Evil Librarians The Scrivener's Bones The Knights of Crystallia The Shattered Lens The Dark Talent The Rithmatist series The Rithmatist Other books by Brandon Sanderson The Reckoners Steelheart Firefight Calamity At the Publisher's request, this title is being sold without Digital Rights Management Software (DRM) applied.	544	http://books.google.com/books/content?id=t_ZYYXZq4RgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
yuCUZ3km3qIC	Neverwhere	Neil Gaiman 	Richard Mayhew is a young man with a good heart and an ordinarylife, which is changed forever when he stops to help a girl he finds bleeding on a London sidewalk. His small act of kindness propels him into a world he never dreamed existed. There are people who fall through the cracks, and Richard has become one of them. And he must learn to survive in this city of shadows and darkness, monsters and saints, murderers and angels, if he is ever to return to the London that he knew.	400	http://books.google.com/books/content?id=yuCUZ3km3qIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
bxahDwAAQBAJ	Hidden Valley Road	Robert Kolker 	OPRAH’S BOOK CLUB PICK #1 NEW YORK TIMES BESTSELLER ONE OF THE NEW YORK TIMES TOP TEN BOOKS OF THE YEAR ONE OF THE WALL STREET JOURNAL TOP TEN BOOKS OF THE YEAR PEOPLE'S #1 BEST BOOK OF THE YEAR Named a BEST BOOK OF THE YEAR by The New York Times, The Washington Post, NPR, TIME, Slate, Smithsonian, The New York Post, and Amazon The heartrending story of a midcentury American family with twelve children, six of them diagnosed with schizophrenia, that became science's great hope in the quest to understand the disease. Don and Mimi Galvin seemed to be living the American dream. After World War II, Don's work with the Air Force brought them to Colorado, where their twelve children perfectly spanned the baby boom: the oldest born in 1945, the youngest in 1965. In those years, there was an established script for a family like the Galvins--aspiration, hard work, upward mobility, domestic harmony--and they worked hard to play their parts. But behind the scenes was a different story: psychological breakdown, sudden shocking violence, hidden abuse. By the mid-1970s, six of the ten Galvin boys, one after another, were diagnosed as schizophrenic. How could all this happen to one family? What took place inside the house on Hidden Valley Road was so extraordinary that the Galvins became one of the first families to be studied by the National Institute of Mental Health. Their story offers a shadow history of the science of schizophrenia, from the era of institutionalization, lobotomy, and the schizophrenogenic mother to the search for genetic markers for the disease, always amid profound disagreements about the nature of the illness itself. And unbeknownst to the Galvins, samples of their DNA informed decades of genetic research that continues today, offering paths to treatment, prediction, and even eradication of the disease for future generations. With clarity and compassion, bestselling and award-winning author Robert Kolker uncovers one family's unforgettable legacy of suffering, love, and hope.	400	http://books.google.com/books/content?id=bxahDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
PxNcDwAAQBAJ	The 7 1⁄2 Deaths of Evelyn Hardcastle	Stuart Turton 	"Agatha Christie meets Groundhog Day...quite unlike anything I've ever read, and altogether triumphant."—A. J. Finn, #1 New York Times-bestselling author of The Woman in the Window The Rules of Blackheath Evelyn Hardcastle will be murdered at 11:00 p.m. There are eight days, and eight witnesses for you to inhabit. We will only let you escape once you tell us the name of the killer. Understood? Then let's begin... *** Evelyn Hardcastle will die. Every day until Aiden Bishop can identify her killer and break the cycle. But every time the day begins again, Aiden wakes up in the body of a different guest. And some of his hosts are more helpful than others. For fans of Claire North and Kate Atkinson, The 71⁄2 Deaths of Evelyn Hardcastle is a breathlessly addictive novel that follows one man's race against time to find a killer—but an astonishing time-turning twist means that nothing and no one are quite what they seem. Praise for The 7 1⁄2 Deaths of Evelyn Hardcastle: Costa First Novel Award 2018 Winner One of Stylist Magazine's 20 Must-Read Books of 2018 One of Harper's Bazaar's 10 Must-Read Books of 2018 One of Guardian's Best Books of 2018	480	http://books.google.com/books/content?id=PxNcDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
D5RbDwAAQBAJ	A People's Future of the United States	Charlie Jane Anders Lesley Nneka Arimah Charles Yu	A glittering landscape of twenty-five speculative stories that challenge oppression and envision new futures for America—from N. K. Jemisin, Charles Yu, Jamie Ford, G. Willow Wilson, Charlie Jane Anders, Hugh Howey, and more. NAMED ONE OF THE BEST BOOKS OF THE YEAR BY PUBLISHERS WEEKLY In these tumultuous times, in our deeply divided country, many people are angry, frightened, and hurting. Knowing that imagining a brighter tomorrow has always been an act of resistance, editors Victor LaValle and John Joseph Adams invited an extraordinarily talented group of writers to share stories that explore new forms of freedom, love, and justice. They asked for narratives that would challenge oppressive American myths, release us from the chokehold of our history, and give us new futures to believe in. They also asked that the stories be badass. The result is this spectacular collection of twenty-five tales that blend the dark and the light, the dystopian and the utopian. These tales are vivid with struggle and hardship—whether it’s the othered and the terrorized, or dragonriders and covert commandos—but these characters don’t flee, they fight. Thrilling, inspiring, and a sheer joy to read, A People’s Future of the United States is a gift for anyone who believes in our power to dream a just world. Featuring stories by Violet Allen • Charlie Jane Anders • Lesley Nneka Arimah • Ashok K. Banker • Tobias S. Buckell • Tananarive Due • Omar El Akkad • Jamie Ford • Maria Dahvana Headley • Hugh Howey • Lizz Huerta • Justina Ireland • N. K. Jemisin • Alice Sola Kim • Seanan McGuire • Sam J. Miller • Daniel José Older • Malka Older • Gabby Rivera • A. Merc Rustad • Kai Cheng Thom • Catherynne M. Valente • Daniel H. Wilson • G. Willow Wilson • Charles Yu	432	http://books.google.com/books/content?id=D5RbDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
uXtLDwAAQBAJ	Vita Nostra	Sergey and Marina Dyachenko 	“Vita Nostra” — a cross between Lev Grossman’s “The Magicians” and Elizabeth Kostova’s “The Historian” [...] is the anti-Harry Potter you didn’t know you wanted.” -- The Washington Post “Vita Nostra has become a powerful influence on my own writing. It’s a book that has the potential to become a modern classic of its genre, and I couldn’t be more excited to see it get the global audience in English it so richly deserves.” -- Lev Grossman Best Books of November 2018 -- Paste Magazine The definitive English language translation of the internationally acclaimed Russian novel—a brilliant dark fantasy combining psychological suspense, enchantment, and terror that makes us consider human existence in a fresh and provocative way. Our life is brief . . . Sasha Samokhina has been accepted to the Institute of Special Technologies. Or, more precisely, she’s been chosen. Situated in a tiny village, she finds the students are bizarre, and the curriculum even more so. The books are impossible to read, the lessons obscure to the point of maddening, and the work refuses memorization. Using terror and coercion to keep the students in line, the school does not punish them for their transgressions and failures; instead, it is their families that pay a terrible price. Yet despite her fear, Sasha undergoes changes that defy the dictates of matter and time; experiences which are nothing she has ever dreamed of . . . and suddenly all she could ever want. A complex blend of adventure, magic, science, and philosophy that probes the mysteries of existence, filtered through a distinct Russian sensibility, this astonishing work of speculative fiction—brilliantly translated by Julia Meitov Hersey—is reminiscent of modern classics such as Lev Grossman’s The Magicians, Max Barry’s Lexicon, and Katherine Arden’s The Bear and the Nightingale, but will transport them to a place far beyond those fantastical worlds.	416	http://books.google.com/books/content?id=uXtLDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
vH3LDwAAQBAJ	The Invisible Life of Addie LaRue	V. E. Schwab 	AN INSTANT NEW YORK TIMES BESTSELLER USA TODAY BESTSELLER NATIONAL INDIE BESTSELLER THE WASHINGTON POST BESTSELLER #1 Indie Next Pick and #1 LibraryReads Pick - October 2020 Recommended by Entertainment Weekly, Real Simple, NPR, Slate, and Oprah Magazine A “Best Of” Book From: CNN *Amazon Editors * Goodreads * Bustle * PopSugar * BuzzFeed * Barnes & Noble * Kirkus Reviews * Lambda Literary * Nerdette * The Nerd Daily * Polygon * Library Reads * io9 * Smart Bitches Trashy Books * LiteraryHub * Medium * BookBub * The Mary Sue * Chicago Tribune * NY Daily News * SyFy Wire * Powells.com * Bookish * Book Riot * In the vein of The Time Traveler’s Wife and Life After Life, The Invisible Life of Addie LaRue is New York Times bestselling author V. E. Schwab’s genre-defying tour de force. A Life No One Will Remember. A Story You Will Never Forget. France, 1714: in a moment of desperation, a young woman makes a Faustian bargain to live forever—and is cursed to be forgotten by everyone she meets. Thus begins the extraordinary life of Addie LaRue, and a dazzling adventure that will play out across centuries and continents, across history and art, as a young woman learns how far she will go to leave her mark on the world. But everything changes when, after nearly 300 years, Addie stumbles across a young man in a hidden bookstore and he remembers her name. At the Publisher's request, this title is being sold without Digital Rights Management Software (DRM) applied.	480	http://books.google.com/books/content?id=vH3LDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
ZSu2DQAAQBAJ	All Systems Red	Martha Wells 	Winner: 2018 Hugo Award for Best Novella Winner: 2018 Nebula Award for Best Novella Winner: 2018 Alex Award Winner: 2018 Locus Award One of the Verge's Best Books of 2017 A New York Times and USA Today Bestseller A murderous android discovers itself in All Systems Red, a tense science fiction adventure by Martha Wells that interrogates the roots of consciousness through Artificial Intelligence. "As a heartless killing machine, I was a complete failure." In a corporate-dominated spacefaring future, planetary missions must be approved and supplied by the Company. Exploratory teams are accompanied by Company-supplied security androids, for their own safety. But in a society where contracts are awarded to the lowest bidder, safety isn’t a primary concern. On a distant planet, a team of scientists are conducting surface tests, shadowed by their Company-supplied ‘droid — a self-aware SecUnit that has hacked its own governor module, and refers to itself (though never out loud) as “Murderbot.” Scornful of humans, all it really wants is to be left alone long enough to figure out who it is. But when a neighboring mission goes dark, it's up to the scientists and their Murderbot to get to the truth. At the Publisher's request, this title is being sold without Digital Rights Management Software (DRM) applied.	144	http://books.google.com/books/content?id=ZSu2DQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
MA78DwAAQBAJ	The Searcher	Tana French 	Best Book of 2020 New York Times |NPR | New York Post "This hushed suspense tale about thwarted dreams of escape may be her best one yet . . . Its own kind of masterpiece." --Maureen Corrigan, The Washington Post "A new Tana French is always cause for celebration . . . Read it once for the plot; read it again for the beauty and subtlety of French's writing." --Sarah Lyall, The New York Times Cal Hooper thought a fixer-upper in a bucolic Irish village would be the perfect escape. After twenty-five years in the Chicago police force and a bruising divorce, he just wants to build a new life in a pretty spot with a good pub where nothing much happens. But when a local kid whose brother has gone missing arm-twists him into investigating, Cal uncovers layers of darkness beneath his picturesque retreat, and starts to realize that even small towns shelter dangerous secrets. "One of the greatest crime novelists writing today" (Vox) weaves a masterful, atmospheric tale of suspense, asking how to tell right from wrong in a world where neither is simple, and what we stake on that decision.	464	http://books.google.com/books/content?id=MA78DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
Vu8vDwAAQBAJ	Circe	Madeline Miller 	"A bold and subversive retelling of the goddess's story," this #1 New York Times bestseller is "both epic and intimate in its scope, recasting the most infamous female figure from the Odyssey as a hero in her own right" (Alexandra Alter, The New York Times). In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child -- not powerful, like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess power -- the power of witchcraft, which can transform rivals into monsters and menace the gods themselves. Threatened, Zeus banishes her to a deserted island, where she hones her occult craft, tames wild beasts and crosses paths with many of the most famous figures in all of mythology, including the Minotaur, Daedalus and his doomed son Icarus, the murderous Medea, and, of course, wily Odysseus. But there is danger, too, for a woman who stands alone, and Circe unwittingly draws the wrath of both men and gods, ultimately finding herself pitted against one of the most terrifying and vengeful of the Olympians. To protect what she loves most, Circe must summon all her strength and choose, once and for all, whether she belongs with the gods she is born from, or the mortals she has come to love. With unforgettably vivid characters, mesmerizing language, and page-turning suspense, Circe is a triumph of storytelling, an intoxicating epic of family rivalry, palace intrigue, love and loss, as well as a celebration of indomitable female strength in a man's world. #1 New York Times Bestseller -- named one of the Best Books of the Year by NPR, the Washington Post, People, Time, Amazon, Entertainment Weekly, Bustle, Newsweek, the A.V. Club, Christian Science Monitor, Refinery 29, Buzzfeed, Paste, Audible, Kirkus, Publishers Weekly, Thrillist, NYPL, Self, Real Simple, Goodreads, Boston Globe, Electric Literature, BookPage, the Guardian, Book Riot, Seattle Times, and Business Insider.	400	http://books.google.com/books/content?id=Vu8vDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
AIjCDwAAQBAJ	Anxious People	Fredrik Backman 	Instant #1 New York Times Bestseller A People Book of the Week, Book of the Month Club selection, and Best of Fall in Good Housekeeping, PopSugar, The Washington Post, New York Post, Shondaland, CNN, and more! “[A] quirky, big-hearted novel…Wry, wise, and often laugh-out-loud funny, it’s a wholly original story that delivers pure pleasure.” —People From the #1 New York Times bestselling author of A Man Called Ove comes a charming, poignant novel about a crime that never took place, a would-be bank robber who disappears into thin air, and eight extremely anxious strangers who find they have more in common than they ever imagined. Looking at real estate isn’t usually a life-or-death situation, but an apartment open house becomes just that when a failed bank robber bursts in and takes a group of strangers hostage. The captives include a recently retired couple who relentlessly hunt down fixer-uppers to avoid the painful truth that they can’t fix their own marriage. There’s a wealthy bank director who has been too busy to care about anyone else and a young couple who are about to have their first child but can’t seem to agree on anything, from where they want to live to how they met in the first place. Add to the mix an eighty-seven-year-old woman who has lived long enough not to be afraid of someone waving a gun in her face, a flustered but still-ready-to-make-a-deal real estate agent, and a mystery man who has locked himself in the apartment’s only bathroom, and you’ve got the worst group of hostages in the world. Each of them carries a lifetime of grievances, hurts, secrets, and passions that are ready to boil over. None of them is entirely who they appear to be. And all of them—the bank robber included—desperately crave some sort of rescue. As the authorities and the media surround the premises these reluctant allies will reveal surprising truths about themselves and set in motion a chain of events so unexpected that even they can hardly explain what happens next. Rich with Fredrik Backman’s “pitch-perfect dialogue and an unparalleled understanding of human nature” (Shelf Awareness), Anxious People is an ingeniously constructed story about the enduring power of friendship, forgiveness, and hope—the things that save us, even in the most anxious times.	352	http://books.google.com/books/content?id=AIjCDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
m33HDwAAQBAJ	Interior Chinatown	Charles Yu 	Willis Wu doesn't perceive himself as a protagonist even in his own life: He's merely Generic Asian man. Sometimes he gets to be Background Oriental Making a Weird Face or even Disgraced Son, but he is always relegated to a prop. Yet every day he leaves his tiny room in a Chinatown SRO and enters the Golden Palace restaurant, where Black and White, a procedural cop show, is in perpetual production. He's a bit player here, too, but he dreams of being Kung Fu Guy--the most respected old that anyone who looks like him can attain. At least that's what he has been told, time and time again. Except by one person, his mother. Who says to him: Be more. Playful but heartfelt, a send-up of Hollywood tropes and Asian stereotypes, Interior Chinatown is Charles Yu's most moving, daring, and masterly novel yet.	288	http://books.google.com/books/content?id=m33HDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
JoecDwAAQBAJ	Hood Feminism	Mikki Kendall 	A NEW YORK TIMES BESTSELLER “One of the most important books of the current moment.”—Time “A rousing call to action... It should be required reading for everyone.”—Gabrielle Union, author of We’re Going to Need More Wine “A brutally candid and unobstructed portrait of mainstream white feminism.” —Ibram X. Kendi, author of How to Be an Antiracist A potent and electrifying critique of today’s feminist movement announcing a fresh new voice in black feminism Today's feminist movement has a glaring blind spot, and paradoxically, it is women. Mainstream feminists rarely talk about meeting basic needs as a feminist issue, argues Mikki Kendall, but food insecurity, access to quality education, safe neighborhoods, a living wage, and medical care are all feminist issues. All too often, however, the focus is not on basic survival for the many, but on increasing privilege for the few. That feminists refuse to prioritize these issues has only exacerbated the age-old problem of both internecine discord and women who rebuff at carrying the title. Moreover, prominent white feminists broadly suffer from their own myopia with regard to how things like race, class, sexual orientation, and ability intersect with gender. How can we stand in solidarity as a movement, Kendall asks, when there is the distinct likelihood that some women are oppressing others? In her searing collection of essays, Mikki Kendall takes aim at the legitimacy of the modern feminist movement, arguing that it has chronically failed to address the needs of all but a few women. Drawing on her own experiences with hunger, violence, and hypersexualization, along with incisive commentary on politics, pop culture, the stigma of mental health, and more, Hood Feminism delivers an irrefutable indictment of a movement in flux. An unforgettable debut, Kendall has written a ferocious clarion call to all would-be feminists to live out the true mandate of the movement in thought and in deed.	288	http://books.google.com/books/content?id=JoecDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
BFlADwAAQBAJ	Foundryside	Robert Jackson Bennett 	"The exciting beginning of a promising new epic fantasy series. Prepare for ancient mysteries, innovative magic, and heart-pounding heists."—Brandon Sanderson “Complex characters, magic that is tech and vice versa, a world bound by warring trade dynasties: Bennett will leave you in awe once you remember to breathe!”—Tamora Pierce In a city that runs on industrialized magic, a secret war will be fought to overwrite reality itself—the first in a dazzling new series from City of Stairs author Robert Jackson Bennett. Sancia Grado is a thief, and a damn good one. And her latest target, a heavily guarded warehouse on Tevanne’s docks, is nothing her unique abilities can’t handle. But unbeknownst to her, Sancia’s been sent to steal an artifact of unimaginable power, an object that could revolutionize the magical technology known as scriving. The Merchant Houses who control this magic—the art of using coded commands to imbue everyday objects with sentience—have already used it to transform Tevanne into a vast, remorseless capitalist machine. But if they can unlock the artifact’s secrets, they will rewrite the world itself to suit their aims. Now someone in those Houses wants Sancia dead, and the artifact for themselves. And in the city of Tevanne, there’s nobody with the power to stop them. To have a chance at surviving—and at stopping the deadly transformation that’s under way—Sancia will have to marshal unlikely allies, learn to harness the artifact’s power for herself, and undergo her own transformation, one that will turn her into something she could never have imagined.	512	http://books.google.com/books/content?id=BFlADwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
n09kDwAAQBAJ	The Moment of Lift	Melinda Gates 	NEW YORK TIMES BESTSELLER “In her book, Melinda tells the stories of the inspiring people she’s met through her work all over the world, digs into the data, and powerfully illustrates issues that need our attention—from child marriage to gender inequity in the workplace.” — President Barack Obama “The Moment of Lift is an urgent call to courage. It changed how I think about myself, my family, my work, and what’s possible in the world. Melinda weaves together vulnerable, brave storytelling and compelling data to make this one of those rare books that you carry in your heart and mind long after the last page.” — Brené Brown, Ph.D., author of the New York Times #1 bestseller Dare to Lead “Melinda Gates has spent many years working with women around the world. This book is an urgent manifesto for an equal society where women are valued and recognized in all spheres of life. Most of all, it is a call for unity, inclusion and connection. We need this message more than ever.” — Malala Yousafzai "Melinda Gates's book is a lesson in listening. A powerful, poignant, and ultimately humble call to arms." — Tara Westover, author of the New York Times #1 bestseller Educated A debut from Melinda Gates, a timely and necessary call to action for women's empowerment. “How can we summon a moment of lift for human beings – and especially for women? Because when you lift up women, you lift up humanity.” For the last twenty years, Melinda Gates has been on a mission to find solutions for people with the most urgent needs, wherever they live. Throughout this journey, one thing has become increasingly clear to her: If you want to lift a society up, you need to stop keeping women down. In this moving and compelling book, Melinda shares lessons she’s learned from the inspiring people she’s met during her work and travels around the world. As she writes in the introduction, “That is why I had to write this book—to share the stories of people who have given focus and urgency to my life. I want all of us to see ways we can lift women up where we live.” Melinda’s unforgettable narrative is backed by startling data as she presents the issues that most need our attention—from child marriage to lack of access to contraceptives to gender inequity in the workplace. And, for the first time, she writes about her personal life and the road to equality in her own marriage. Throughout, she shows how there has never been more opportunity to change the world—and ourselves. Writing with emotion, candor, and grace, she introduces us to remarkable women and shows the power of connecting with one another. When we lift others up, they lift us up, too.	224	http://books.google.com/books/content?id=n09kDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
oaqRDwAAQBAJ	The Painted Man (The Demon Cycle, Book 1)	Peter V. Brett 	A stunning special edition of Peter V. Brett’s thrilling debut THE PAINTED MAN, the modern fantasy classic that began The Demon Cycle, featuring over 30 illustrations by acclaimed fantasy artist Dominik Broniek.	544	http://books.google.com/books/content?id=oaqRDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
QCPBDwAAQBAJ	Rhythm of War	Brandon Sanderson 	An instant #1 New York Times Bestseller and a USA Today and Indie Bestseller! The Stormlight Archive saga continues in Rhythm of War, the eagerly awaited sequel to Brandon Sanderson's #1 New York Times bestselling Oathbringer, from an epic fantasy writer at the top of his game. After forming a coalition of human resistance against the enemy invasion, Dalinar Kholin and his Knights Radiant have spent a year fighting a protracted, brutal war. Neither side has gained an advantage, and the threat of a betrayal by Dalinar’s crafty ally Taravangian looms over every strategic move. Now, as new technological discoveries by Navani Kholin’s scholars begin to change the face of the war, the enemy prepares a bold and dangerous operation. The arms race that follows will challenge the very core of the Radiant ideals, and potentially reveal the secrets of the ancient tower that was once the heart of their strength. At the same time that Kaladin Stormblessed must come to grips with his changing role within the Knights Radiant, his Windrunners face their own problem: As more and more deadly enemy Fused awaken to wage war, no more honorspren are willing to bond with humans to increase the number of Radiants. Adolin and Shallan must lead the coalition’s envoy to the honorspren stronghold of Lasting Integrity and either convince the spren to join the cause against the evil god Odium, or personally face the storm of failure. Other Tor books by Brandon Sanderson The Cosmere The Stormlight Archive The Way of Kings Words of Radiance Edgedancer (Novella) Oathbringer Rhythm of War The Mistborn trilogy Mistborn: The Final Empire The Well of Ascension The Hero of Ages Mistborn: The Wax and Wayne series Alloy of Law Shadows of Self Bands of Mourning Collection Arcanum Unbounded Other Cosmere novels Elantris Warbreaker The Alcatraz vs. the Evil Librarians series Alcatraz vs. the Evil Librarians The Scrivener's Bones The Knights of Crystallia The Shattered Lens The Dark Talent The Rithmatist series The Rithmatist Other books by Brandon Sanderson The Reckoners Steelheart Firefight Calamity At the Publisher's request, this title is being sold without Digital Rights Management Software (DRM) applied.	1088	http://books.google.com/books/content?id=QCPBDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
KOy_DwAAQBAJ	The House in the Cerulean Sea Sneak Peek	TJ Klune 	Download a FREE sneak peek today: "1984 meets The Umbrella Academy with a pinch of Douglas Adams thrown in." (Gail Carriger) A magical island. A dangerous task. A burning secret. An enchanting love story, masterfully told, The House in the Cerulean Sea is about the profound experience of discovering an unlikely family in an unexpected place—and realizing that family is yours. The House in the Cerulean Sea is Lambda Literary Award-winning author TJ Klune’s breakout contemporary fantasy. At the Publisher's request, this title is being sold without Digital Rights Management Software (DRM) applied.	54	http://books.google.com/books/content?id=KOy_DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
-vnoDwAAQBAJ	The Vanishing Half	Brit Bennett 	#1 NEW YORK TIMES BESTSELLER ONE OF BARACK OBAMA'S FAVORITE BOOKS OF THE YEAR NAMED A BEST BOOK OF 2020 BY THE NEW YORK TIMES * THE WASHINGTON POST * NPR * PEOPLE * TIME MAGAZINE* VANITY FAIR * GLAMOUR "Bennett's tone and style recalls James Baldwin and Jacqueline Woodson, but it's especially reminiscent of Toni Morrison's 1970 debut novel, The Bluest Eye." --Kiley Reid, Wall Street Journal "A story of absolute, universal timelessness ...For any era, it's an accomplished, affecting novel. For this moment, it's piercing, subtly wending its way toward questions about who we are and who we want to be...." - Entertainment Weekly From The New York Times-bestselling author of The Mothers, a stunning new novel about twin sisters, inseparable as children, who ultimately choose to live in two very different worlds, one black and one white. The Vignes twin sisters will always be identical. But after growing up together in a small, southern black community and running away at age sixteen, it's not just the shape of their daily lives that is different as adults, it's everything: their families, their communities, their racial identities. Many years later, one sister lives with her black daughter in the same southern town she once tried to escape. The other secretly passes for white, and her white husband knows nothing of her past. Still, even separated by so many miles and just as many lies, the fates of the twins remain intertwined. What will happen to the next generation, when their own daughters' storylines intersect? Weaving together multiple strands and generations of this family, from the Deep South to California, from the 1950s to the 1990s, Brit Bennett produces a story that is at once a riveting, emotional family story and a brilliant exploration of the American history of passing. Looking well beyond issues of race, The Vanishing Half considers the lasting influence of the past as it shapes a person's decisions, desires, and expectations, and explores some of the multiple reasons and realms in which people sometimes feel pulled to live as something other than their origins. As with her New York Times-bestselling debut The Mothers, Brit Bennett offers an engrossing page-turner about family and relationships that is immersive and provocative, compassionate and wise.	352	http://books.google.com/books/content?id=-vnoDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
obAHf43THvQC	Ancillary Justice	Ann Leckie 	The only novel ever to win the Hugo, Nebula, and Arthur C. Clarke Awards and the first book in Ann Leckie's New York Times bestselling trilogy. On a remote, icy planet, the soldier known as Breq is drawing closer to completing her quest. Once, she was the Justice of Toren - a colossal starship with an artificial intelligence linking thousands of soldiers in the service of the Radch, the empire that conquered the galaxy. Now, an act of treachery has ripped it all away, leaving her with one fragile human body, unanswered questions, and a burning desire for vengeance. In the Ancillary world: 1. Ancillary Justice2. Ancillary Sword3. Ancillary Mercy	432	http://books.google.com/books/content?id=obAHf43THvQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
0AGrDwAAQBAJ	Network Effect	Martha Wells 	The first full-length novel in Martha Wells' New York Times and USA Today bestselling Murderbot Diaries series. "I caught myself rereading my favorite parts... and I can’t recommend it enough." — New York Times You know that feeling when you’re at work, and you’ve had enough of people, and then the boss walks in with yet another job that needs to be done right this second or the world will end, but all you want to do is go home and binge your favorite shows? And you're a sentient murder machine programmed for destruction? Congratulations, you're Murderbot. Come for the pew-pew space battles, stay for the most relatable A.I. you’ll read this century. — I’m usually alone in my head, and that’s where 90 plus percent of my problems are. When Murderbot's human associates (not friends, never friends) are captured and another not-friend from its past requires urgent assistance, Murderbot must choose between inertia and drastic action. Drastic action it is, then. At the Publisher's request, this title is being sold without Digital Rights Management Software (DRM) applied.	352	http://books.google.com/books/content?id=0AGrDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
ilc0DwAAQBAJ	Harry Potter - A Journey Through A History of Magic	British Library 	The official companion book to the British Library exhibition and the ultimate gift for Harry Potter fans! As the British Library unveils a very special new exhibition in the UK, Harry Potter: A History of Magic, readers everywhere are invited on an enchanting journey through the Hogwarts curriculum, from Care of Magical Creatures and Herbology to Defense Against the Dark Arts, Astronomy, and more in this eBook uncovering thousands of years of magical history.Prepare to be amazed by artifacts released from the archives of the British Library, unseen sketches and manuscript pages from J.K. Rowling, and incredible illustrations from artist Jim Kay. Discover the truth behind the origins of the Philosopher's Stone, monstrous dragons, and troublesome trolls; examine real-life wands and find out what actually makes a mandrake scream; pore over remarkable pages from da Vinci's notebook; and discover the oldest atlas of the night sky. Carefully curated by the British Library and full of extraordinary treasures from all over the world, this is an unforgettable journey exploring the history of the magic at the heart of the Harry Potter stories.	144	http://books.google.com/books/content?id=ilc0DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
DU0LDAAAQBAJ	Fantastic Beasts and Where to Find Them: The Original Screenplay	J.K. Rowling 	When Magizoologist Newt Scamander arrives in New York, he intends his stay to be just a brief stopover. However, when his magical case is misplaced and some of Newt's fantastic beasts escape, it spells trouble for everyone... Inspired by the original Hogwart’s textbook by Newt Scamander, Fantastic Beasts and Where to Find Them: The Original screenplay marks the screenwriting debut of J.K. Rowling, author of the beloved and internationally bestselling Harry Potter books. A feat of imagination and featuring a cast of remarkable characters and magical creatures, this is epic adventure-packed storytelling at its very best. Whether an existing fan or new to the wizarding world, this is a perfect addition for any film lover or reader’s bookshelf. The film Fantastic Beasts and Where to Find Them will have its theatrical release on 18th November 2016.	304	http://books.google.com/books/content?id=DU0LDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
EO7zvQAACAAJ	The Tales of Beedle the Bard	J. K. Rowling 	The Tales of Beedle the Bard, a wizarding classic, first came to Muggle readers' attention in the book known as Harry Potter and the Deathly Hallows. Now, thanks to Hermione Granger's new translation from the ancient runes, we present this stunning edition with an introduction, notes, and illustrations by J.K. Rowling, and extensive commentary by Albus Dumbledore. Never before have Muggles been privy to these richly imaginative tales: "The Wizard and the Hopping Pot," "The Fountain of Fair Fortune," "The Warlock's Hairy Heart," "Babbitty Rabbitty and Her Cackling Stump," and of course "The Tale of the Three Brothers." But not only are they the equal of fairy tales we know and love, reading them gives new insight into the wizarding world. This purchase also represents another very important form of giving: From every sale of this book, Scholastic will give its net proceeds to Lumos, an international non-profit organization founded by J.K. Rowling that works globally to transform the lives of disadvantaged children. wearelumos.org	128	http://books.google.com/books/content?id=EO7zvQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
tWwuCgAAQBAJ	The Magic of Math	Arthur Benjamin 	The world's greatest mental mathematical magician takes us on a spellbinding journey through the wonders of numbers (and more) "Arthur Benjamin . . . joyfully shows you how to make nature's numbers dance." -- Bill Nye (the science guy) The Magic of Math is the math book you wish you had in school. Using a delightful assortment of examples-from ice-cream scoops and poker hands to measuring mountains and making magic squares-this book revels in key mathematical fields including arithmetic, algebra, geometry, and calculus, plus Fibonacci numbers, infinity, and, of course, mathematical magic tricks. Known throughout the world as the "mathemagician," Arthur Benjamin mixes mathematics and magic to make the subject fun, attractive, and easy to understand for math fan and math-phobic alike. "A positively joyful exploration of mathematics." -- Publishers Weekly, starred review "Each [trick] is more dazzling than the last." -- Physics World	336	http://books.google.com/books/content?id=tWwuCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
vFYRDgAAQBAJ	Code Girls	Liza Mundy 	The award-winning New York Times bestseller about the American women who secretly served as codebreakers during World War II--a "prodigiously researched and engrossing" (New York Times) book that "shines a light on a hidden chapter of American history" (Denver Post). Recruited by the U.S. Army and Navy from small towns and elite colleges, more than ten thousand women served as codebreakers during World War II. While their brothers and boyfriends took up arms, these women moved to Washington and learned the meticulous work of code-breaking. Their efforts shortened the war, saved countless lives, and gave them access to careers previously denied to them. A strict vow of secrecy nearly erased their efforts from history; now, through dazzling research and interviews with surviving code girls, bestselling author Liza Mundy brings to life this riveting and vital story of American courage, service, and scientific accomplishment.	432	http://books.google.com/books/content?id=vFYRDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
Q12MCgAAQBAJ	The Invention of Hugo Cabret	Brian Selznick 	ORPHAN, CLOCK KEEPER, AND THIEF, twelve-year-old Hugo lives in the walls of a busy Paris train station, where his survival depends on secrets and anonymity. But when his world suddenly interlocks with an eccentric girl and her grandfather, Hugo's undercover life, and his most precious secret, are put in jeopardy. A cryptic drawing, a treasured notebook, a stolen key, a mechanical man, and a hidden message from Hugo's dead father form the backbone of this intricate, tender, and spellbinding mystery.	534	http://books.google.com/books/content?id=Q12MCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
OYtkbGl2j0sC	Fahrenheit 451	Ray Bradbury 	NOW AN HBO FILM STARRING MICHAEL B. JORDAN AND MICHAEL SHANNON Sixty years after its originally publication, Ray Bradbury’s internationally acclaimed novel Fahrenheit 451 stands as a classic of world literature set in a bleak, dystopian future. Today its message has grown more relevant than ever before. Guy Montag is a fireman. His job is to destroy the most illegal of commodities, the printed book, along with the houses in which they are hidden. Montag never questions the destruction and ruin his actions produce, returning each day to his bland life and wife, Mildred, who spends all day with her television “family.” But when he meets an eccentric young neighbor, Clarisse, who introduces him to a past where people didn’t live in fear and to a present where one sees the world through the ideas in books instead of the mindless chatter of television, Montag begins to question everything he has ever known.	208	http://books.google.com/books/content?id=OYtkbGl2j0sC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
kotPYEqx7kMC	1984	George Orwell 	A PBS Great American Read Top 100 Pick With extraordinary relevance and renewed popularity, George Orwell’s 1984 takes on new life in this edition. “Orwell saw, to his credit, that the act of falsifying reality is only secondarily a way of changing perceptions. It is, above all, a way of asserting power.”—The New Yorker In 1984, London is a grim city in the totalitarian state of Oceania where Big Brother is always watching you and the Thought Police can practically read your mind. Winston Smith is a man in grave danger for the simple reason that his memory still functions. Drawn into a forbidden love affair, Winston finds the courage to join a secret revolutionary organization called The Brotherhood, dedicated to the destruction of the Party. Together with his beloved Julia, he hazards his life in a deadly match against the powers that be. Lionel Trilling said of Orwell’s masterpiece, “1984 is a profound, terrifying, and wholly fascinating book. It is a fantasy of the political future, and like any such fantasy, serves its author as a magnifying device for an examination of the present.” Though the year 1984 now exists in the past, Orwell’s novel remains an urgent call for the individual willing to speak truth to power.	648	http://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
ZrsVZKWJg4UC	The Handmaid's Tale	Margaret Atwood 	Now a Hulu Original Series The Handmaid’s Tale is a novel of such power that the reader will be unable to forget its images and its forecast. Set in the near future, it describes life in what was once the United States and is now called the Republic of Gilead, a monotheocracy that has reacted to social unrest and a sharply declining birthrate by reverting to, and going beyond, the repressive intolerance of the original Puritans. The regime takes the Book of Genesis absolutely at its word, with bizarre consequences for the women and men in its population. The story is told through the eyes of Offred, one of the unfortunate Handmaids under the new social order. In condensed but eloquent prose, by turns cool-eyed, tender, despairing, passionate, and wry, she reveals to us the dark corners behind the establishment’s calm facade, as certain tendencies now in existence are carried to their logical conclusions. The Handmaid’s Tale is funny, unexpected, horrifying, and altogether convincing. It is at once scathing satire, dire warning, and a tour de force. It is Margaret Atwood at her best.	311	http://books.google.com/books/content?id=ZrsVZKWJg4UC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
sUtrdMJvFXAC	A Series of Unfortunate Events #1: The Bad Beginning	Lemony Snicket 	NOW A NETFLIX ORIGINAL SERIES In the tradition of great storytellers, from Dickens to Dahl, comes an exquisitely dark comedy that is both literary and irreverent, hilarious and deftly crafted. Never before has a tale of three likeable and unfortunate children been quite so enchanting, or quite so uproariously unhappy. Are you made fainthearted by death? Does fire unnerve you? Is a villain something that might crop up in future nightmares of yours? Are you thrilled by nefarious plots? Is cold porridge upsetting to you? Vicious threats? Hooks? Uncomfortable clothing? It is likely that your answers will reveal A Series of Unfortunate Events to be ill-suited for your personal use. A librarian, bookseller, or acquaintance should be able to suggest books more appropriate for your fragile temperament. But to the rarest of readers we say, "Proceed, but cautiously."	176	http://books.google.com/books/content?id=sUtrdMJvFXAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
Si_m1YGBLUcC	Disney's Aladdin	Karen Kreider 	A young man enlists the aid of a genie to keep a princess from being forced to marry a man she does not love.	24	http://books.google.com/books/content?id=Si_m1YGBLUcC&printsec=frontcover&img=1&zoom=1&source=gbs_api
SiFa-XvuQmAC	Adventures of Huckleberry Finn	Mark Twain 	In Mark Twain's classic tale of friendship and adventure, Huckleberry Finn escapes his evil, drunken father, befriends a runaway slave named Jim, and sails the Mississippi River! As Huck and Jim sail to freedom, they encounter con men and thieves and get in plenty of trouble along the way. Follow Huck's coming-of-age journey in the Calico Illustrated Classics adaptation of Twain's The Adventures of Huckleberry Finn. Calico Chapter Books is an imprint of Magic Wagon, a division of ABDO Group. Grades 3-8.	112	http://books.google.com/books/content?id=SiFa-XvuQmAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
FNF1CwAAQBAJ	The Book Thief	Markus Zusak 	'Life affirming, triumphant and tragic . . . masterfully told. . . but also a wonderful page-turner' Guardian 'Brilliant and hugely ambitious' New York Times 'Extraordinary' Telegraph ___ HERE IS A SMALL FACT - YOU ARE GOING TO DIE 1939. Nazi Germany. The country is holding its breath. Death has never been busier. Liesel, a nine-year-old girl, is living with a foster family on Himmel Street. Her parents have been taken away to a concentration camp. Liesel steals books. This is her story and the story of the inhabitants of her street when the bombs begin to fall. SOME IMPORTANT INFORMATION - THIS NOVEL IS NARRATED BY DEATH ___ Over 16 million copies sold worldwide. Now a major motion picture.	560	http://books.google.com/books/content?id=FNF1CwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
RyapBAAAQBAJ	Brave New Worlds	John Joseph Adams 	From Huxley's Brave New World, to Orwell's 1984, to Atwood's The Handmaid's Tale, dystopian books have always been an integral part of both science fiction and literature, and have influenced the broader culture discussion in unique and permanent ways. Brave New Worlds brings together the best dystopian fiction of the last 30 years, demonstrating the diversity that flourishes in this compelling subgenre. This landmark tome contains stories by Ursula K. Le Guin, Cory Doctorow, M. Rickert, Paolo Bacigalupi, Orson Scott Card, Neil Gaiman, Ray Bradbury, and many others.	489	http://books.google.com/books/content?id=RyapBAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
aFapBAAAQBAJ	The Innovators	Walter Isaacson 	A revelatory history of the people who created the computer and the internet discusses the process through which innovation happens in the modern world, citing the pivotal contributions of such figures as programming pioneer Ada Lovelace. By the author of Steve Jobs. 500,000 first printing.	542	http://books.google.com/books/content?id=aFapBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
73DVMgEACAAJ	An Illustrated Treasury of Grimm's Fairy Tales	Jacob Grimm Wilhelm Grimm 	Two hundred years ago, the Brothers Grimm published their famous collection of folk tales, including these thirty much-loved stories of helpful elves; giants who can see into the next land; foolish but good-hearted lads; princesses with golden hair; faithful servants and wicked queens. This sumptuously illustrated collection of essential Grimm classics includes stories every childhood needs: The Princess and the Frog, Little Red Riding Hood, Sleeping Beauty, Cinderella, Rumpelstiltskin and dozens more. Each tale is brought to life with radiant, faithful pictures from Daniela Drescher, one of Germany's best-loved illustrators, which are sure to fire any child's imagination.	224	http://books.google.com/books/content?id=73DVMgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
Y7sOAAAAIAAJ	Alice's Adventures in Wonderland	Lewis Carroll 	In the most renowned novel by English author Lewis Carroll, restless young Alice literally stumbles into adventure when she follows the hurried, time-obsessed White Rabbit down a hole and into a fantastical realm where animals are quite verbose, logic is in short supply, and royalty tends to be exceedingly unpleasant. Each playfully engaging chapter presents absurd scenarios involving an unforgettable cast of characters, including the grinning Cheshire Cat and the short-tempered Queen of Hearts, and every stop on Alice's peculiar journey is marked by sharp social satire and wondrously witty wordplay.	200	http://books.google.com/books/content?id=Y7sOAAAAIAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
GtiJDQAAQBAJ	Anne Frank's Tales from the Secret Annex	Anne Frank 	A collection of the author's lesser-known writings includes stories, personal reminiscences, previously deleted excerpts from her diary, and an unfinished novel composed while she was hidden from the Nazis.	208	http://books.google.com/books/content?id=GtiJDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
IO-ZwwEACAAJ	Monty Python's Big Red Book	Graham Chapman 	October 2019 marks the fiftieth anniversary of the first broadcast of Monty Python's Flying Circus on BBC Television. This humorous book contains zany writing and illustrations used by Monty Python. Graham Chapman's education and vocational training occurred variously in such places as the Midlands, Eton, the University of Cambridge, St Swithin's Hospital, on tour in a revue with John Cleese in New Zealand and on the island of Ibiza with David Frost. He was the author of A Liar's Autobiography and he also wrote for Monty Python's Flying Circus and the TV show Doctor in the House. Graham Chapman died in 1989. John Cleese was educated at the University of Cambridge where he performed in Footlights and then went to work in London as a performer and as a comedy writer for the BBC. Besides his work with Python he is best known for his TV series Fawlty Towers (co-written with Connie Booth), the books he has written with psychologist Robin Skinner and films such as Clockwise, A Fish Called Wanda and Fierce Creatures. Eric Idle was educated at the University of Cambridge where he joined the Footlights Club becoming president of the club in 1965. He created and acted in The Rutles and has appeared in numerous films including The Adventures of Baron Munchausen and wrote the book, and co-wrote the lyrics, for the award-winning musical Spamalot (based on Monty Python & The Holy Grail). Educated at the University of Oxford, Terry Jones worked in theatre, and wrote revues and scripts for the BBC before becoming one of the creators of Monty Python. He has written many books for children and is also the author (with other scholars) of Who Murdered Chaucer? and a study of Chaucer's Knight. He has directed such films as Personal Services, Erik the Viking and The Wind in the Willows, along with all the Python films. Michael Palin was born in Sheffield in 1943 and lives with his wife Helen in North London. His adventures around the world have been huge bestsellers. His books (all of which have accompanied his documentaries for the BBC) include Around the World in 80 Days, Pole to Pole, Full Circle, Sahara and Himalaya. His films have included The Missionary and A Private Function. As part of the Monty Python team, Terry Gilliam produced the series' bizarre animations as well as performing. His subsequent career has encompassed animation and film-making, and he has directed films including The Adventures of Baron Munchausen, Brazil, Twelve Monkeys and Fear and Loathing in Las Vegas.	0	http://books.google.com/books/content?id=IO-ZwwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
j24GMN0OtS8C	The Hitchhiker's Guide to the Galaxy	Douglas Adams 	NEW YORK TIMES BESTSELLER • “Extremely funny . . . inspired lunacy . . . [and] over much too soon.”—The Washington Post Book World SOON TO BE A HULU SERIES • Now celebrating the pivotal 42nd anniversary of The Hitchhiker’s Guide to the Galaxy! Nominated as one of America’s best-loved novels by PBS’s The Great American Read It’s an ordinary Thursday morning for Arthur Dent . . . until his house gets demolished. The Earth follows shortly after to make way for a new hyperspace express route, and Arthur’s best friend has just announced that he’s an alien. After that, things get much, much worse. With just a towel, a small yellow fish, and a book, Arthur has to navigate through a very hostile universe in the company of a gang of unreliable aliens. Luckily the fish is quite good at languages. And the book is The Hitchhiker’s Guide to the Galaxy . . . which helpfully has the words DON’T PANIC inscribed in large, friendly letters on its cover. Douglas Adams’s mega-selling pop-culture classic sends logic into orbit, plays havoc with both time and physics, offers up pithy commentary on such things as ballpoint pens, potted plants, and digital watches . . . and, most important, reveals the ultimate answer to life, the universe, and everything. Now, if you could only figure out the question. . . .	304	http://books.google.com/books/content?id=j24GMN0OtS8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
E-kdBQAAQBAJ	A Court of Thorns and Roses	Sarah J. Maas 	The sexy, action-packed first book in the #1 New York Times bestselling Court of Thorns and Roses series from Sarah J. Maas. When nineteen-year-old huntress Feyre kills a wolf in the woods, a terrifying creature arrives to demand retribution. Dragged to a treacherous magical land she knows about only from legends, Feyre discovers that her captor is not truly a beast, but one of the lethal, immortal faeries who once ruled her world. At least, he's not a beast all the time. As she adapts to her new home, her feelings for the faerie, Tamlin, transform from icy hostility into a fiery passion that burns through every lie she's been told about the beautiful, dangerous world of the Fae. But something is not right in the faerie lands. An ancient, wicked shadow is growing, and Feyre must find a way to stop it, or doom Tamlin-and his world-forever. From bestselling author Sarah J. Maas comes a seductive, breathtaking book that blends romance, adventure, and faerie lore into an unforgettable read.	432	http://books.google.com/books/content?id=E-kdBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
OQR4BgAAQBAJ	Go Set a Watchman	Harper Lee 	A historic literary event: the publication of a newly discovered novel, the earliest known work from Harper Lee, the beloved, bestselling author of the Pulitzer Prize-winning classic, To Kill a Mockingbird. Originally written in the mid-1950s, Go Set a Watchman was the novel Harper Lee first submitted to her publishers before To Kill a Mockingbird. Assumed to have been lost, the manuscript was discovered in late 2014. Go Set a Watchman features many of the characters from To Kill a Mockingbird some twenty years later. Returning home to Maycomb to visit her father, Jean Louise Finch—Scout—struggles with issues both personal and political, involving Atticus, society, and the small Alabama town that shaped her. Exploring how the characters from To Kill a Mockingbird are adjusting to the turbulent events transforming mid-1950s America, Go Set a Watchman casts a fascinating new light on Harper Lee’s enduring classic. Moving, funny and compelling, it stands as a magnificent novel in its own right.	288	http://books.google.com/books/content?id=OQR4BgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
3YUrtAEACAAJ	Harry Potter and the Sorcerer's Stone	J. K. Rowling 	A special new edition in celebration of the 20th anniversary of the publication of Harry Potter and the Sorcerer's Stone, with a stunning new cover illustration by Caldecott Medalist Brian Selznick. Harry Potter has never been the star of a Quidditch team, scoring points while riding a broom far above the ground. He knows no spells, has never helped to hatch a dragon, and has never worn a cloak of invisibility. All he knows is a miserable life with the Dursleys, his horrible aunt and uncle, and their abominable son, Dudley - a great big swollen spoiled bully. Harry's room is a tiny closet at the foot of the stairs, and he hasn't had a birthday party in eleven years. But all that is about to change when a mysterious letter arrives by owl messenger: a letter with an invitation to an incredible place that Harry - and anyone who reads about him - will find unforgettable. For it's there that he finds not only friends, aerial sports, and magic in everything from classes to meals, but a great destiny that's been waiting for him... if Harry can survive the encounter. This gorgeous new edition in celebration of the 20th anniversary of the publication of Harry Potter and the Sorcerer's Stone features a newly designed cover illustrated by Caldecott Medalist Brian Selznick, as well as the beloved original interior decorations by Mary GrandPré.	336	http://books.google.com/books/content?id=3YUrtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
oZhagX6UWOMC	A Brief History of Time	Stephen Hawking 	#1 NEW YORK TIMES BESTSELLER A landmark volume in science writing by one of the great minds of our time, Stephen Hawking’s book explores such profound questions as: How did the universe begin—and what made its start possible? Does time always flow forward? Is the universe unending—or are there boundaries? Are there other dimensions in space? What will happen when it all ends? Told in language we all can understand, A Brief History of Time plunges into the exotic realms of black holes and quarks, of antimatter and “arrows of time,” of the big bang and a bigger God—where the possibilities are wondrous and unexpected. With exciting images and profound imagination, Stephen Hawking brings us closer to the ultimate secrets at the very heart of creation.	224	http://books.google.com/books/content?id=oZhagX6UWOMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
XIga7RhvVOIC	The Amazing Adventures of Kavalier and Clay	Michael Chabon 	In 1939 New York City, Joe Kavalier, a refugee from Hitler's Prague, joins forces with his Brooklyn-born cousin, Sammy Clay, to create comic-book superheroes inspired by their own fantasies, fears, and dreams.	684	http://books.google.com/books/content?id=XIga7RhvVOIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
bm-KDQAAQBAJ	Beloved	Toni Morrison 	Sethe, an escaped slave living in post-Civil War Ohio with her daughter and mother-in-law, is haunted persistently by the ghost of the dead baby girl whom she sacrificed, in a new edition of the Nobel Laureate's Pulitzer Prize-winning novel. Reader's Guide available. Reprint. 60,000 first printing.	321	http://books.google.com/books/content?id=bm-KDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
Hg0jKHsj6DMC	A Confederacy of Dunces	John Kennedy Toole 	Winner of the Pulitzer Prize “A masterwork . . . the novel astonishes with its inventiveness . . . it is nothing less than a grand comic fugue.”—The New York Times Book Review A Confederacy of Dunces is an American comic masterpiece. John Kennedy Toole's hero, one Ignatius J. Reilly, is "huge, obese, fractious, fastidious, a latter-day Gargantua, a Don Quixote of the French Quarter. His story bursts with wholly original characters, denizens of New Orleans' lower depths, incredibly true-to-life dialogue, and the zaniest series of high and low comic adventures" (Henry Kisor, Chicago Sun-Times).	416	http://books.google.com/books/content?id=Hg0jKHsj6DMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
zaynQgAACAAJ	The Hitch Hiker's Guide to the Galaxy	Douglas Adams 	A one-volume edition charting Arthur Dent's odyssey through space, comprising:The Hitchhikers Guide to the Galaxy: One Thursday lunchtime the Earth gets demolished to make way for a hyperspace bypass. For Arthur, who has just had his house demolished, this is too much. Sadly, the weekend's just begun.The Restaurant at the End of the Universe: When all issues of space, time, matter and the nature of being are resolved, only one question remains: Where shall we have dinner? The Restaurant at the End of the Universe provides the ultimate gastronomic experience and, for once, there is no morning after.Life, the Universe and Everything: In consequence of a number of stunning catastrophes, Arthur Dent is surprised to find himself living in a hideously miserable cave on prehistoric Earth. And then, just as he thinks that things cannot possibly get any worse, they suddenly do.So Long, and Thanks for all the Fish: Arthur Dent's sense of reality is in its dickiest state when he suddenly finds the girl of his dreams. They go in search of God's Final Message and, in a dramatic break with tradition, actually find it.	590	http://books.google.com/books/content?id=zaynQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
C1MI_4nZyD4C	The History of Jazz	Ted Gioia 	Jazz is the most colorful and varied art form in the world and it was born in one of the most colorful and varied cities, New Orleans. From the seed first planted by slave dances held in Congo Square and nurtured by early ensembles led by Buddy Belden and Joe "King" Oliver, jazz began its long winding odyssey across America and around the world, giving flower to a thousand different forms--swing, bebop, cool jazz, jazz-rock fusion--and a thousand great musicians. Now, in The History of Jazz, Ted Gioia tells the story of this music as it has never been told before, in a book that brilliantly portrays the legendary jazz players, the breakthrough styles, and the world in which it evolved. Here are the giants of jazz and the great moments of jazz history--Jelly Roll Morton ("the world's greatest hot tune writer"), Louis Armstrong (whose O-keh recordings of the mid-1920s still stand as the most significant body of work that jazz has produced), Duke Ellington at the Cotton Club, cool jazz greats such as Gerry Mulligan, Stan Getz, and Lester Young, Charlie Parker's surgical precision of attack, Miles Davis's 1955 performance at the Newport Jazz Festival, Ornette Coleman's experiments with atonality, Pat Metheny's visionary extension of jazz-rock fusion, the contemporary sounds of Wynton Marsalis, and the post-modernists of the Knitting Factory. Gioia provides the reader with lively portraits of these and many other great musicians, intertwined with vibrant commentary on the music they created. Gioia also evokes the many worlds of jazz, taking the reader to the swamp lands of the Mississippi Delta, the bawdy houses of New Orleans, the rent parties of Harlem, the speakeasies of Chicago during the Jazz Age, the after hours spots of corrupt Kansas city, the Cotton Club, the Savoy, and the other locales where the history of jazz was made. And as he traces the spread of this protean form, Gioia provides much insight into the social context in which the music was born. He shows for instance how the development of technology helped promote the growth of jazz--how ragtime blossomed hand-in-hand with the spread of parlor and player pianos, and how jazz rode the growing popularity of the record industry in the 1920s. We also discover how bebop grew out of the racial unrest of the 1940s and '50s, when black players, no longer content with being "entertainers," wanted to be recognized as practitioners of a serious musical form. Jazz is a chameleon art, delighting us with the ease and rapidity with which it changes colors. Now, in Ted Gioia's The History of Jazz, we have at last a book that captures all these colors on one glorious palate. Knowledgeable, vibrant, and comprehensive, it is among the small group of books that can truly be called classics of jazz literature.	480	http://books.google.com/books/content?id=C1MI_4nZyD4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
eOpvKgAACAAJ	All the President's Men	Bob Woodward Carl Bernstein 	Two reporters were assigned to cover what seemed a routine burglary in the opulent Watergate building in downtown Washington. It was the first step in what must be the most devastating political detective story of the century.	372	http://books.google.com/books/content?id=eOpvKgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
zr5NBldVA5UC	And Then There Were None	Agatha Christie 	When ten people arrive on private Indian Island off England's southwest coast, lured to a mansion by invitations from a mysterious host, terror mounts as one guest after another is murdered, in a classic whodunit that is an elaboration of the famous children's rhyme "Ten Little Indians." Reader's Guide included. Reprint. 100,000 first printing.	264	http://books.google.com/books/content?id=zr5NBldVA5UC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
G-f1CQAAQBAJ	The Bell Jar	Sylvia Plath 	Sylvia Plath's shocking, realistic, and intensely emotional novel about a woman falling into the grip of insanity Esther Greenwood is brilliant, beautiful, enormously talented, and successful, but slowly going under—maybe for the last time. In her acclaimed and enduring masterwork, Sylvia Plath brilliantly draws the reader into Esther's breakdown with such intensity that her insanity becomes palpably real, even rational—as accessible an experience as going to the movies. A deep penetration into the darkest and most harrowing corners of the human psyche, The Bell Jar is an extraordinary accomplishment and a haunting American classic.	288	http://books.google.com/books/content?id=G-f1CQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
FYKQRCzdYjwC	Brick Lane	Monica Ali 	“A book you won’t be able to put down. A Bangladeshi immigrant in London is torn between the kind, tedious older husband with whom she has an arranged marriage (and children) and the fiery political activist she lusts after. A novel that’s multi-continental, richly detailed and elegantly crafted.” —Curtis Sittenfeld, author of Sisterland After an arranged marriage to Chanu, a man twenty years older, Nazneen is taken to London, leaving her home and heart in the Bangladeshi village where she was born. Her new world is full of mysteries. How can she cross the road without being hit by a car (an operation akin to dodging raindrops in the monsoon)? What is the secret of her bullying neighbor Mrs. Islam? What is a Hell's Angel? And how must she comfort the naïve and disillusioned Chanu? As a good Muslim girl, Nazneen struggles to not question why things happen. She submits, as she must, to Fate and devotes herself to her husband and daughters. Yet to her amazement, she begins an affair with a handsome young radical, and her erotic awakening throws her old certainties into chaos. Monica Ali’s splendid novel is about journeys both external and internal, where the marvelous and the terrifying spiral together.	384	http://books.google.com/books/content?id=FYKQRCzdYjwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
Xfze51E7TEoC	Catch-22	Joseph Heller 	Presents the contemporary classic depicting the struggles of a U.S. airman attempting to survive the lunacy and depravity of a World War II base	415	http://books.google.com/books/content?id=Xfze51E7TEoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
VqVO5aB2t44C	Complete Stories	Dorothy Parker 	As this complete collection of her short stories demonstrates, Dorothy Parker’s talents extended far beyond brash one-liners and clever rhymes. Her stories not only bring to life the urban milieu that was her bailiwick but lay bare the uncertainties and disappointments of ordinary people living ordinary lives. For more than seventy years, Penguin has been the leading publisher of classic literature in the English-speaking world. With more than 1,700 titles, Penguin Classics represents a global bookshelf of the best works throughout history and across genres and disciplines. Readers trust the series to provide authoritative texts enhanced by introductions and notes by distinguished scholars and contemporary authors, as well as up-to-date translations by award-winning translators.	480	http://books.google.com/books/content?id=VqVO5aB2t44C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
55AFYh5XadkC	Pride and Prejudice	Jane Austen 	Jane Austen is arguably the finest female novelist who ever lived and Pride and Prejudice is arguably the finest, and is certainly the most popular, of her novels. An undoubted classic of world literature, its profound Christian morality is all too often missed or wilfully overlooked by today's (post)modern critics. Yet Austen saw the follies and foibles of human nature, and the frictions and fidelities of family life, with an incisive eye that penetrates to the very heart of the human condition. This edition of Austen's masterpiece includes an introduction by Professor Christopher Blum and several insightful critical essays by leading Austen scholars.	417	http://books.google.com/books/content?id=55AFYh5XadkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
dXLWAAAAMAAJ	The Giving Tree	Shel Silverstein 	'Once there was a tree...and she loved a little boy.' So begins a story of unforgettable perception, beautifully written and illustrated by the gifted and versatile Shel Silverstein. Every day the boy would come to the tree to eat her apples, swing from her branches, or slide down her trunk...and the tree was happy. But as the boy grew older he began to want more from the tree, and the tree gave and gave and gave. This is a tender story, touched with sadness, aglow with consolation. Shel Silverstein has created a moving parable for readers of all ages that offers an affecting interpretation of the gift of giving and a serene acceptance of another's capacity to love in return. Ages 10+	64	http://books.google.com/books/content?id=dXLWAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
v0iuYlsc8EIC	Little Women	Louisa May Alcott 	Little Women has remained enduringly popular since its publication in 1868, becoming the inspiration for a whole genre of family stories. Set in a small New England community, it tells of the March family: Marmee looks after daughters in the absence of her husband, who is serving as an army chaplain in the Civil War, and Meg, Jo,Beth, and Amy experience domestic trials and triumphs as they attempt to supplement the family's small income. In the second part of the novel (sometimes known as Good Wives) the girls grow up and fall in love. The novel is highly autobiographical, and in Jo's character Alcott portrays a strong-minded and independent woman, determined to control her own destiny. The introduction to this edition provides a fascinating history of the Alcotts,and of Louisa Alcott's own struggles as a writer. ABOUT THE SERIES: For over 100 years Oxford World's Classics has made available the widest range of literature from around the globe. Each affordable volume reflects Oxford's commitment to scholarship, providing the most accurate text plus a wealth of other valuable features, including expert introductions by leading authorities, helpful notes to clarify the text, up-to-date bibliographies for further study, and much more.	528	http://books.google.com/books/content?id=v0iuYlsc8EIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
PGR2AwAAQBAJ	To Kill a Mockingbird	Harper Lee 	Voted America's Best-Loved Novel in PBS's The Great American Read Harper Lee's Pulitzer Prize-winning masterwork of honor and injustice in the deep South—and the heroism of one man in the face of blind and violent hatred One of the most cherished stories of all time, To Kill a Mockingbird has been translated into more than forty languages, sold more than forty million copies worldwide, served as the basis for an enormously popular motion picture, and was voted one of the best novels of the twentieth century by librarians across the country. A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice, it views a world of great beauty and savage inequities through the eyes of a young girl, as her father—a crusading local lawyer—risks everything to defend a black man unjustly accused of a terrible crime.	336	http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
KR_twAEACAAJ	Harry Potter and the Chamber of Secrets	J. K. Rowling 	Harry Potter series #2.	341	http://books.google.com/books/content?id=KR_twAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
6JBOxAEACAAJ	The House in the Cerulean Sea	TJ Klune 	Lambda Literary Award-winning author TJ Klune’s breakout contemporary fantasy Linus Baker is a by-the-book case worker in the Department in Charge of Magical Youth. He's tasked with determining whether six dangerous magical children are likely to bring about the end of the world. Arthur Parnassus is the master of the orphanage. He would do anything to keep the children safe, even if it means the world will burn. And his secrets will come to light. The House in the Cerulean Sea is an enchanting love story, masterfully told, about the profound experience of discovering an unlikely family in an unexpected place—and realizing that family is yours. "1984 meets The Umbrella Academy with a pinch of Douglas Adams thrown in." —Gail Carriger, New York Times bestselling author of Soulless	400	http://books.google.com/books/content?id=6JBOxAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api
d84AspgFjSwC	The Magicians	Lev Grossman 	The New York Times bestselling novel about a young man practicing magic in the real world, now an original series on SYFY “The Magicians is to Harry Potter as a shot of Irish whiskey is to a glass of weak tea. . . . Hogwarts was never like this.” —George R.R. Martin “Sad, hilarious, beautiful, and essential to anyone who cares about modern fantasy.” —Joe Hill “A very knowing and wonderful take on the wizard school genre.” —John Green “The Magicians may just be the most subversive, gripping and enchanting fantasy novel I’ve read this century.” —Cory Doctorow “This gripping novel draws on the conventions of contemporary and classic fantasy novels in order to upend them . . . an unexpectedly moving coming-of-age story.” —The New Yorker “The best urban fantasy in years.” —A.V. Club Quentin Coldwater is brilliant but miserable. A high school math genius, he’s secretly fascinated with a series of children’s fantasy novels set in a magical land called Fillory, and real life is disappointing by comparison. When Quentin is unexpectedly admitted to an elite, secret college of magic, it looks like his wildest dreams have come true. But his newfound powers lead him down a rabbit hole of hedonism and disillusionment, and ultimately to the dark secret behind the story of Fillory. The land of his childhood fantasies turns out to be much darker and more dangerous than he ever could have imagined. . . . The prequel to the New York Times bestselling book The Magician King and the #1 bestseller The Magician's Land, The Magicians is one of the most daring and inventive works of literary fantasy in years. No one who has escaped into the worlds of Narnia and Harry Potter should miss this breathtaking return to the landscape of the imagination.	416	http://books.google.com/books/content?id=d84AspgFjSwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api
\.


--
-- Data for Name: books_categories; Type: TABLE DATA; Schema: public; Owner: vagrant
--

COPY public.books_categories (id, isbn, category_id) FROM stdin;
1	F7IqEFlwXkkC	14
2	XV8XAAAAYAAJ	14
3	s1gVAAAAYAAJ	2
4	VHKeKCeJm84C	2
5	-xyzCwAAQBAJ	2
7	3zx9PwAACAAJ	14
8	_NRmDwAAQBAJ	14
9	ggbLDwAAQBAJ	2
10	aWypDwAAQBAJ	2
11	_luMDQAAQBAJ	14
12	AupU4dGrst0C	2
13	hB0PswEACAAJ	14
14	vPNaAAAAMAAJ	2
15	rR0ZEAAAQBAJ	14
16	swJWQ5qq804C	2
17	BcG2dVRXKukC	1
18	dLo_GyEykjQC	1
19	QVn-CgAAQBAJ	1
20	t_ZYYXZq4RgC	1
21	yuCUZ3km3qIC	1
22	bxahDwAAQBAJ	15
23	PxNcDwAAQBAJ	15
24	MA78DwAAQBAJ	15
25	D5RbDwAAQBAJ	15
26	Vu8vDwAAQBAJ	15
27	uXtLDwAAQBAJ	15
28	AIjCDwAAQBAJ	15
29	vH3LDwAAQBAJ	15
30	m33HDwAAQBAJ	15
31	ZSu2DQAAQBAJ	15
32	JoecDwAAQBAJ	16
33	BFlADwAAQBAJ	16
34	n09kDwAAQBAJ	16
35	oaqRDwAAQBAJ	16
36	QCPBDwAAQBAJ	16
38	-vnoDwAAQBAJ	16
39	obAHf43THvQC	16
40	0AGrDwAAQBAJ	16
41	ilc0DwAAQBAJ	3
42	DU0LDAAAQBAJ	3
43	EO7zvQAACAAJ	3
44	tWwuCgAAQBAJ	3
45	vFYRDgAAQBAJ	3
46	OYtkbGl2j0sC	6
47	FNF1CwAAQBAJ	6
48	kotPYEqx7kMC	6
49	RyapBAAAQBAJ	6
50	ZrsVZKWJg4UC	6
51	aFapBAAAQBAJ	12
52	sUtrdMJvFXAC	12
53	Q12MCgAAQBAJ	12
56	SiFa-XvuQmAC	13
57	Jy8S_9fN5wAC	13
58	73DVMgEACAAJ	13
59	Y7sOAAAAIAAJ	13
60	FNF1CwAAQBAJ	7
61	GtiJDQAAQBAJ	7
62	OYtkbGl2j0sC	7
63	IO-ZwwEACAAJ	11
65	zaynQgAACAAJ	11
70	oZhagX6UWOMC	10
71	C1MI_4nZyD4C	10
72	eOpvKgAACAAJ	9
73	XIga7RhvVOIC	9
74	zr5NBldVA5UC	17
76	G-f1CQAAQBAJ	17
77	bm-KDQAAQBAJ	17
78	FYKQRCzdYjwC	9
79	Xfze51E7TEoC	9
80	Hg0jKHsj6DMC	9
81	VqVO5aB2t44C	17
82	v0iuYlsc8EIC	5
83	rR0ZEAAAQBAJ	5
84	55AFYh5XadkC	5
85	PGR2AwAAQBAJ	4
86	dXLWAAAAMAAJ	4
87	KR_twAEACAAJ	4
88	OQR4BgAAQBAJ	4
89	6JBOxAEACAAJ	1
90	d84AspgFjSwC	1
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: vagrant
--

COPY public.categories (id, user_id, label) FROM stdin;
2	2	My Favorite Books
3	3	My Favorite Books
4	4	My Favorite Books
5	5	My Favorite Books
6	6	My Favorite Books
7	7	My Favorite Books
8	8	My Favorite Books
9	9	My Favorite Books
10	10	My Favorite Books
12	12	My Favorite Books
14	2	Classics
15	1	Book Club
16	1	Want to Read
13	13	Favorite Adventures
11	11	Favorites
17	9	Favorite Women
1	1	Fantasy Faves
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: vagrant
--

COPY public.events (id, host_id, city, state, event_date, start_time, end_time, is_private, can_add_books, can_vote) FROM stdin;
2	2	Berkeley	CA	2021-03-19	19:00:00	21:00:00	f	t	f
3	3	San Francisco	CA	2021-04-09	20:00:00	22:00:00	f	t	f
6	6	Oakland	CA	2021-05-05	18:00:00	20:00:00	f	t	f
5	5	Lafayette	CA	2021-04-14	17:00:00	19:00:00	f	t	f
4	4	Remote	\N	2021-04-22	18:00:00	20:00:00	f	t	f
1	1	Pleasanton	CA	2021-03-26	18:00:00	20:00:00	f	f	t
\.


--
-- Data for Name: events_attendees; Type: TABLE DATA; Schema: public; Owner: vagrant
--

COPY public.events_attendees (id, user_id, event_id, is_attending, voted_for) FROM stdin;
6	4	2	t	
7	13	2	t	
9	2	2	t	
10	6	3	t	
11	5	3	t	
12	2	3	t	
14	3	3	t	
15	7	4	t	
16	8	4	t	
17	6	4	t	
18	5	4	t	
19	4	4	t	
20	9	5	t	
21	10	5	t	
22	5	5	t	
23	11	6	t	
24	12	6	t	
25	6	6	t	
26	4	6	t	
3	3	1	t	
4	9	1	t	
5	8	1	t	
29	5	1	t	
32	12	5	t	
33	12	3	t	
35	1	2	t	
2	2	1	t	 bxahDwAAQBAJ 
1	1	1	t	 tWwuCgAAQBAJ 
\.


--
-- Data for Name: events_books; Type: TABLE DATA; Schema: public; Owner: vagrant
--

COPY public.events_books (id, isbn, event_id, vote_count, is_the_one) FROM stdin;
1	-xyzCwAAQBAJ	2	0	t
2	JoecDwAAQBAJ	\N	0	t
4	PxNcDwAAQBAJ	1	0	t
5	n09kDwAAQBAJ	2	0	t
7	vFYRDgAAQBAJ	3	0	t
8	OYtkbGl2j0sC	3	0	t
9	kotPYEqx7kMC	6	0	t
10	ZrsVZKWJg4UC	6	0	t
11	aFapBAAAQBAJ	3	0	t
12	Q12MCgAAQBAJ	6	0	t
13	Y7sOAAAAIAAJ	2	0	t
14	zaynQgAACAAJ	6	0	t
15	Hg0jKHsj6DMC	1	0	t
16	v0iuYlsc8EIC	5	0	t
17	rR0ZEAAAQBAJ	3	0	t
18	OQR4BgAAQBAJ	2	0	t
19	PGR2AwAAQBAJ	4	0	t
20	KR_twAEACAAJ	4	0	t
21	sUtrdMJvFXAC	5	0	t
22	6JBOxAEACAAJ	2	0	t
3	bxahDwAAQBAJ	1	1	t
6	tWwuCgAAQBAJ	1	1	t
\.


--
-- Data for Name: friendships; Type: TABLE DATA; Schema: public; Owner: vagrant
--

COPY public.friendships (id, requestor_id, is_friend, pending) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: vagrant
--

COPY public.users (id, first_name, last_name, email, password_hash, city, state, is_searchable) FROM stdin;
2	Matilda	Wormwood	matilda@bookworm.com	pbkdf2:sha256:150000$ZyWxqBB2$ae4e7ac97512d3df44ab0daaa59acea725a9b635e5c977af1828e9ae5ef289f2	\N	\N	t
3	Hermione	Granger	hermione@bookworm.com	pbkdf2:sha256:150000$yKOqo8Sa$d6bbbd5d96a46a2d0d0eaeb67f9567116be93fe32ff840c332bc6d2d86985e9e	\N	\N	t
4	Scout	Finch	scout@bookworm.com	pbkdf2:sha256:150000$XEVWWhzy$3e4a510a0dbd03002597d840947e56f8af96a9d7616957876ab9719502ae95d3	\N	\N	t
5	Jo	March	jo@bookworm.com	pbkdf2:sha256:150000$2OBG9M4r$20c0810fb803bad8656f32a79e54403a3f899fd0c120b100d16b05fcbbb29686	\N	\N	t
6	Guy	Montag	guy@bookworm.com	pbkdf2:sha256:150000$UO60vV5E$84f41a22d2ef372b528e8a04efb4982377b0cb2efa2843bf4c743d6082ab530d	\N	\N	t
7	Liesel	Merminger	liesel@bookworm.com	pbkdf2:sha256:150000$jQiDWXl7$7c2d7807c04d4d623f173bc1e63f29b931ef26fe540df543c6fc9c2e921071d4	\N	\N	t
8	Lois	Laine	lois@bookworm.com	pbkdf2:sha256:150000$nzRTmoXx$bf2b604550e02a38115f88db28687d9c52b3aadb72a056708333cf7200ce3e20	\N	\N	t
9	Rory	Gilmore	rory@bookworm.com	pbkdf2:sha256:150000$YmxB0BX6$e2a4ac8e2aabe321f36066f063abc383e849729177a38b8c5e6a0fb6538674a6	\N	\N	t
10	Lisa	Simpson	lisa@bookworm.com	pbkdf2:sha256:150000$dfrGfg6m$278c73a7597289d021cfa42024220e7c907e4bde7033e0da41f749cb4aab4a33	\N	\N	t
12	Klaus	Baudelaire	klaus@bookworm.com	pbkdf2:sha256:150000$1IYAhzeJ$10ccd0ffe10b7fd28046f3a758ebc5f04ab25fff05da5e761bc5451ff4f26968	\N	\N	t
13	Belle	Beauty	belle@bookworm.com	pbkdf2:sha256:150000$7LD1q1C5$d5bb5a22faec719ff08f54747a812f33a7b4d357f47e9aaf0f277433a3b602e2	\N	\N	t
1	Hunter	Laine	hunterglaine@gmail.com	pbkdf2:sha256:150000$QrHkFnNc$f140a559661b18668a291a227ae3d13bc5da22db101eef9f1599bfffad78da63	Pleasanton	CA	t
11	Bernard	Black	bernard@bookworm.com	pbkdf2:sha256:150000$mT1fpEqm$466f5763c3f518f655ef90e0c51036cc5f79e3e2d11eee10ecc4aa538eb7be0a	London	\N	t
\.


--
-- Name: books_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('public.books_categories_id_seq', 90, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('public.categories_id_seq', 17, true);


--
-- Name: events_attendees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('public.events_attendees_id_seq', 35, true);


--
-- Name: events_books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('public.events_books_id_seq', 22, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('public.events_id_seq', 6, true);


--
-- Name: friendships_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('public.friendships_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: books_categories books_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.books_categories
    ADD CONSTRAINT books_categories_pkey PRIMARY KEY (id);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (isbn);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: events_attendees events_attendees_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.events_attendees
    ADD CONSTRAINT events_attendees_pkey PRIMARY KEY (id);


--
-- Name: events_books events_books_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.events_books
    ADD CONSTRAINT events_books_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: friendships friendships_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friendships_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: books_categories books_categories_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.books_categories
    ADD CONSTRAINT books_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: books_categories books_categories_isbn_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.books_categories
    ADD CONSTRAINT books_categories_isbn_fkey FOREIGN KEY (isbn) REFERENCES public.books(isbn);


--
-- Name: categories categories_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: events_attendees events_attendees_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.events_attendees
    ADD CONSTRAINT events_attendees_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id);


--
-- Name: events_attendees events_attendees_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.events_attendees
    ADD CONSTRAINT events_attendees_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: events_books events_books_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.events_books
    ADD CONSTRAINT events_books_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id);


--
-- Name: events_books events_books_isbn_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.events_books
    ADD CONSTRAINT events_books_isbn_fkey FOREIGN KEY (isbn) REFERENCES public.books(isbn);


--
-- Name: events events_host_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_host_id_fkey FOREIGN KEY (host_id) REFERENCES public.users(id);


--
-- Name: friendships friendships_requestor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friendships_requestor_id_fkey FOREIGN KEY (requestor_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

