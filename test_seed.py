"""Script to seed test database"""

import os
import json

import crud
import model
import server
from random import choice

os.system("dropdb testbookworm")
os.system("createdb testbookworm")

model.connect_to_db(server.app, "testbookworm")
model.db.create_all()


#create books for testing
new_books = []

new_book = crud.create_book("oxxszQEACAAJ", "Harry Potter and the Half-Blood Prince", 
                            "J. K. Rowling", "Harry Potter, now sixteen-years-old, begins his sixth year at school in the midst of the battle between good and evil which has heated up with the return of the Dark Lord Voldemort.",
                            652, "http://books.google.com/books/content?id=oxxszQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api")
new_books.append(new_book)
new_book = crud.create_book("yuCUZ3km3qIC", "Neverwhere", "Neil Gaiman", "Richard Mayhew is a young man with a good heart and an ordinarylife, which is changed forever when he stops to help a girl he finds bleeding on a London sidewalk. His small act of kindness propels him into a world he never dreamed existed. There are people who fall through the cracks, and Richard has become one of them. And he must learn to survive in this city of shadows and darkness, monsters and saints, murderers and angels, if he is ever to return to the London that he knew.",
                            400, "http://books.google.com/books/content?id=yuCUZ3km3qIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api")
new_book = crud.create_book("FiIXot_e10sC", "The Secret Life of Bees", "Sue Monk Kidd",
                            "After her \"stand-in mother,\" a bold black woman named Rosaleen, insults the three biggest racists in town, Lily Owens joins Rosaleen on a journey to Tiburon, South Carolina, where they are taken in by three black, bee-keeping sisters.",
                                317, "http://books.google.com/books/content?id=FiIXot_e10sC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api")
new_book = crud.create_book("bxahDwAAQBAJ", "Hidden Valley Road", "Robert Kolker", 
                            "OPRAH’S BOOK CLUB PICK #1 NEW YORK TIMES BESTSELLER ONE OF THE NEW YORK TIMES TOP TEN BOOKS OF THE YEAR ONE OF THE WALL STREET JOURNAL TOP TEN BOOKS OF THE YEAR PEOPLE'S #1 BEST BOOK OF THE YEAR Named a BEST BOOK OF THE YEAR by The New York Times, The Washington Post, NPR, TIME, Slate, Smithsonian, The New York Post, and Amazon The heartrending story of a midcentury American family with twelve children, six of them diagnosed with schizophrenia, that became science's great hope in the quest to understand the disease. Don and Mimi Galvin seemed to be living the American dream. After World War II, Don's work with the Air Force brought them to Colorado, where their twelve children perfectly spanned the baby boom: the oldest born in 1945, the youngest in 1965. In those years, there was an established script for a family like the Galvins--aspiration, hard work, upward mobility, domestic harmony--and they worked hard to play their parts. But behind the scenes was a different story: psychological breakdown, sudden shocking violence, hidden abuse. By the mid-1970s, six of the ten Galvin boys, one after another, were diagnosed as schizophrenic. How could all this happen to one family? What took place inside the house on Hidden Valley Road was so extraordinary that the Galvins became one of the first families to be studied by the National Institute of Mental Health. Their story offers a shadow history of the science of schizophrenia, from the era of institutionalization, lobotomy, and the schizophrenogenic mother to the search for genetic markers for the disease, always amid profound disagreements about the nature of the illness itself. And unbeknownst to the Galvins, samples of their DNA informed decades of genetic research that continues today, offering paths to treatment, prediction, and even eradication of the disease for future generations. With clarity and compassion, bestselling and award-winning author Robert Kolker uncovers one family's unforgettable legacy of suffering, love, and hope.",
                            400, "http://books.google.com/books/content?id=bxahDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api")
new_books.append(new_book)
new_book = crud.create_book("CGVDDwAAQBAJ", "Where the Crawdads Sing", 
                            "Delia Owens", "#1 New York Times Bestseller A Reese Witherspoon x Hello Sunshine Book Club Pick \"I can't even express how much I love this book! I didn't want this story to end!\"--Reese Witherspoon \"Painfully beautiful.\"--The New York Times Book Review \"Perfect for fans of Barbara Kingsolver.\"--Bustle For years, rumors of the \"Marsh Girl\" have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say. Sensitive and intelligent, she has survived for years alone in the marsh that she calls home, finding friends in the gulls and lessons in the sand. Then the time comes when she yearns to be touched and loved. When two young men from town become intrigued by her wild beauty, Kya opens herself to a new life--until the unthinkable happens. Perfect for fans of Barbara Kingsolver and Karen Russell, Where the Crawdads Sing is at once an exquisite ode to the natural world, a heartbreaking coming-of-age story, and a surprising tale of possible murder. Owens reminds us that we are forever shaped by the children we once were, and that we are all subject to the beautiful and violent secrets that nature keeps.",
                            384, "http://books.google.com/books/content?id=CGVDDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api")
new_books.append(new_book)
new_book = crud.create_book("BcG2dVRXKukC", "The Name of the Wind", "Patrick Rothfuss",
                            "'This is a magnificent book' Anne McCaffrey 'I was reminded of Ursula K. Le Guin, George R. R. Martin, and J. R. R. Tolkein, but never felt that Rothfuss was imitating anyone' THE TIMES 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep. My name is Kvothe. You may have heard of me' So begins the tale of Kvothe - currently known as Kote, the unassuming innkeepter - from his childhood in a troupe of traveling players, through his years spent as a near-feral orphan in a crime-riddled city, to his daringly brazen yet successful bid to enter a difficult and dangerous school of magic. In these pages you will come to know Kvothe the notorious magician, the accomplished thief, the masterful musician, the dragon-slayer, the legend-hunter, the lover, the thief and the infamous assassin.",
                            672, "http://books.google.com/books/content?id=BcG2dVRXKukC&printsec=frontcover&img=1&zoom=1&source=gbs_api")
new_books.append(new_book)
new_book = crud.create_book("vH3LDwAAQBAJ", "The Invisible Life of Addie LaRue",
                            "V. E. Schwab", "AN INSTANT NEW YORK TIMES BESTSELLER USA TODAY BESTSELLER NATIONAL INDIE BESTSELLER THE WASHINGTON POST BESTSELLER #1 Indie Next Pick and #1 LibraryReads Pick - October 2020 Recommended by Entertainment Weekly, Real Simple, NPR, Slate, and Oprah Magazine A “Best Of” Book From: CNN *Amazon Editors * Goodreads * Bustle * PopSugar * BuzzFeed * Barnes & Noble * Kirkus Reviews * Lambda Literary * Nerdette * The Nerd Daily * Polygon * Library Reads * io9 * Smart Bitches Trashy Books * LiteraryHub * Medium * BookBub * The Mary Sue * Chicago Tribune * NY Daily News * SyFy Wire * Powells.com * Bookish * Book Riot * In the vein of The Time Traveler’s Wife and Life After Life, The Invisible Life of Addie LaRue is New York Times bestselling author V. E. Schwab’s genre-defying tour de force. A Life No One Will Remember. A Story You Will Never Forget. France, 1714: in a moment of desperation, a young woman makes a Faustian bargain to live forever—and is cursed to be forgotten by everyone she meets. Thus begins the extraordinary life of Addie LaRue, and a dazzling adventure that will play out across centuries and continents, across history and art, as a young woman learns how far she will go to leave her mark on the world. But everything changes when, after nearly 300 years, Addie stumbles across a young man in a hidden bookstore and he remembers her name. At the Publisher's request, this title is being sold without Digital Rights Management Software (DRM) applied.",
                            480, "http://books.google.com/books/content?id=vH3LDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api")
new_books.append(new_book)
new_book = crud.create_book("t_ZYYXZq4RgC", "Mistborn", "Brandon Sanderson",
                            "From #1 New York Times bestselling author Brandon Sanderson, the Mistborn series is a heist story of political intrigue and magical, martial-arts action. For a thousand years the ash fell and no flowers bloomed. For a thousand years the Skaa slaved in misery and lived in fear. For a thousand years the Lord Ruler, the \"Sliver of Infinity,\" reigned with absolute power and ultimate terror, divinely invincible. Then, when hope was so long lost that not even its memory remained, a terribly scarred, heart-broken half-Skaa rediscovered it in the depths of the Lord Ruler's most hellish prison. Kelsier \"snapped\" and found in himself the powers of a Mistborn. A brilliant thief and natural leader, he turned his talents to the ultimate caper, with the Lord Ruler himself as the mark. Kelsier recruited the underworld's elite, the smartest and most trustworthy allomancers, each of whom shares one of his many powers, and all of whom relish a high-stakes challenge. Only then does he reveal his ultimate dream, not just the greatest heist in history, but the downfall of the divine despot. But even with the best criminal crew ever assembled, Kel's plan looks more like the ultimate long shot, until luck brings a ragged girl named Vin into his life. Like him, she's a half-Skaa orphan, but she's lived a much harsher life. Vin has learned to expect betrayal from everyone she meets, and gotten it. She will have to learn to trust, if Kel is to help her master powers of which she never dreamed. This saga dares to ask a simple question: What if the hero of prophecy fails? Other Tor books by Brandon Sanderson The Cosmere The Stormlight Archive The Way of Kings Words of Radiance Edgedancer (Novella) Oathbringer The Mistborn trilogy Mistborn: The Final Empire The Well of Ascension The Hero of Ages Mistborn: The Wax and Wayne series Alloy of Law Shadows of Self Bands of Mourning Collection Arcanum Unbounded Other Cosmere novels Elantris Warbreaker The Alcatraz vs. the Evil Librarians series Alcatraz vs. the Evil Librarians The Scrivener's Bones The Knights of Crystallia The Shattered Lens The Dark Talent The Rithmatist series The Rithmatist Other books by Brandon Sanderson The Reckoners Steelheart Firefight Calamity At the Publisher's request, this title is being sold without Digital Rights Management Software (DRM) applied.",
                            544, "http://books.google.com/books/content?id=t_ZYYXZq4RgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api")
new_books.append(new_book)
new_book = crud.create_book("QVn-CgAAQBAJ", "The Way of Kings", "Brandon Sanderson",
                            "Introduces the world of Roshar through the experiences of a war-weary royal compelled by visions, a highborn youth condemned to military slavery, and a woman who is desperate to save her impoverished house.",
                            1007, "http://books.google.com/books/content?id=QVn-CgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api")
new_books.append(new_book)
new_book = crud.create_book("PxNcDwAAQBAJ", "The 7 1⁄2 Deaths of Evelyn Hardcastle",
                            "Stuart Turton", "\"Agatha Christie meets Groundhog Day...quite unlike anything I've ever read, and altogether triumphant.\"—A. J. Finn, #1 New York Times-bestselling author of The Woman in the Window The Rules of Blackheath Evelyn Hardcastle will be murdered at 11:00 p.m. There are eight days, and eight witnesses for you to inhabit. We will only let you escape once you tell us the name of the killer. Understood? Then let's begin... *** Evelyn Hardcastle will die. Every day until Aiden Bishop can identify her killer and break the cycle. But every time the day begins again, Aiden wakes up in the body of a different guest. And some of his hosts are more helpful than others. For fans of Claire North and Kate Atkinson, The 71⁄2 Deaths of Evelyn Hardcastle is a breathlessly addictive novel that follows one man's race against time to find a killer—but an astonishing time-turning twist means that nothing and no one are quite what they seem. Praise for The 7 1⁄2 Deaths of Evelyn Hardcastle: Costa First Novel Award 2018 Winner One of Stylist Magazine's 20 Must-Read Books of 2018 One of Harper's Bazaar's 10 Must-Read Books of 2018 One of Guardian's Best Books of 2018",
                            480, "http://books.google.com/books/content?id=PxNcDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api")
new_books.append(new_book)



#create users for testing
new_users = []

new_user = crud.create_user("Hunter", "Laine", "hunterglaine@gmail.com", "test")
new_users.append(new_user)
new_user = crud.create_user("Haley", "Laine", "haley@test.com", "test")
new_users.append(new_user)
new_user = crud.create_user("Connor", "Laine", "connor@test.com", "test")
new_users.append(new_user)
new_user = crud.create_user("Steven", "Laine", "steven@test.com", "test")
new_users.append(new_user)
new_user = crud.create_user("Mary", "Laine", "mary@test.com", "test")
new_users.append(new_user)
new_user = crud.create_user("Jake", "Laine", "Jake@test.com", "test")
new_users.append(new_user)


# Create fake events for testing
new_events = []

new_event = crud.create_event(1, "Pleasanton", "2021-03-26", "18:00", "20:00", "CA")
new_events.append(new_event)
new_event = crud.create_event(2, "Berkeley", "2021-03-19", "19:00", "21:00", "CA")
new_events.append(new_event)
new_event = crud.create_event(3, "San Francisco", "2021-04-09", "20:00", "22:00", "CA")
new_events.append(new_event)
new_event = crud.create_event(4, "Remote", "2021-04-22", "18:00", "20:00")
new_events.append(new_event)
new_event = crud.create_event(5, "Lafayette", "2021-04-14", "17:00", "19:00", "CA")
new_events.append(new_event)
new_event = crud.create_event(6, "Oakland", "2021-05-05", "18:00", "20:00", "CA")
new_events.append(new_event)

    # Create fake user_events for testing
for n in range(15): 
    random_user = choice(new_users)
    random_event = choice(new_events)
    crud.create_event_attendee(random_user.id, random_event.id)

    # Create fake event_books for testing
    random_book = choice(new_books)
    crud.create_event_book(random_event, random_book) # CHANGE


# Create fake categories for testing
new_categories = []

for n in range(6):

    user_id = n + 1
    for i in range(4):
        labels = ["Book Club", "Want to Read", "Books to Recommend", "Classics",
                "Sci Fi", "Childhood Faves", "Historical Fiction", 
                "Books to Recommend", "Books I Hate", "Learn Something New",
                "Non-Fiction", "Pure Fiction", "Beach Reads", "Thrillers",
                "My Favorite Books"]

        new_category = crud.create_category(user_id, choice(labels))
        new_categories.append(new_category)

    # Create fake book_categories for testing
        for n in range(1,6):
            random_book = choice(new_books)
            category = new_category
            book_categories = crud.create_book_category(random_book, category)
