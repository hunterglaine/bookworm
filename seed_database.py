"""Script to seed database"""

import os
import json

import crud
import model
import server

os.system("dropdb bookworm")
os.system("createdb bookworm")

model.connect_to_db(server.app)
# model.db.create_all()

os.system("psql bookworm < bookworm.sql")

# Create book-loving users
# new_users = []

# hunter = crud.create_user("Hunter", "Laine", "hunterglaine@gmail.com", "test")
# matilda = crud.create_user("Matilda", "Wormwood", "matilda@bookworm.com", "test")
# hermione = crud.create_user("Hermione", "Granger", "hermione@bookworm.com", "test")
# scout = crud.create_user("Scout", "Finch", "scout@bookworm.com", "test")
# jo = crud.create_user("Jo", "March", "jo@bookworm.com", "test")
# guy = crud.create_user("Guy", "Montag", "guy@bookworm.com", "test")
# liesel = crud.create_user("Liesel", "Merminger", "liesel@bookworm.com", "test")
# lolo = crud.create_user("Lois", "Laine", "lois@bookworm.com", "test")
# rory = crud.create_user("Rory", "Gilmore", "rory@bookworm.com", "test")
# lisa = crud.create_user("Lisa", "Simpson", "lisa@bookworm.com", "test")
# bernard = crud.create_user("Bernard", "Black", "bernard@bookworm.com", "test")
# klaus = crud.create_user("Klaus", "Baudelaire", "klaus@bookworm.com", "test")
# belle = crud.create_user("Belle", "Beauty", "belle@bookworm.com", "test")

# new_users.extend([hunter, matilda, hermione, scout, jo, guy, liesel, lolo, rory,
#                 lisa, bernard, klaus, belle])

# for new_user in new_users:
#     first_category = crud.create_category(new_user.id, "My Favorite Books")

# # Create book club meetings
# event_1 = crud.create_event(1, "Pleasanton", "2021-03-26", "18:00", "20:00", "CA")
# event_2 = crud.create_event(2, "Berkeley", "2021-03-19", "19:00", "21:00", "CA")
# event_3 = crud.create_event(3, "San Francisco", "2021-04-09", "20:00", "22:00", "CA")
# event_4 = crud.create_event(4, "Remote", "2021-04-22", "18:00", "20:00")
# event_5 = crud.create_event(5, "Lafayette", "2021-04-14", "17:00", "19:00", "CA")
# event_6 = crud.create_event(6, "Oakland", "2021-05-05", "18:00", "20:00", "CA")


# # Create fake events_attendees for testing
# crud.create_event_attendee(hunter.id, event_1.id)
# crud.create_event_attendee(matilda.id, event_1.id)
# crud.create_event_attendee(hermione.id, event_1.id)
# crud.create_event_attendee(rory.id, event_1.id)
# crud.create_event_attendee(lolo.id, event_1.id)

# crud.create_event_attendee(scout.id, event_2.id)
# crud.create_event_attendee(belle.id, event_2.id)
# crud.create_event_attendee(hunter.id, event_2.id)
# crud.create_event_attendee(matilda.id, event_2.id)

# crud.create_event_attendee(guy.id, event_3.id)
# crud.create_event_attendee(jo.id, event_3.id)
# crud.create_event_attendee(matilda.id, event_3.id)
# crud.create_event_attendee(klaus.id, event_3.id)
# crud.create_event_attendee(hermione.id, event_3.id)

# crud.create_event_attendee(liesel.id, event_4.id)
# crud.create_event_attendee(lolo.id, event_4.id)
# crud.create_event_attendee(guy.id, event_4.id)
# crud.create_event_attendee(jo.id, event_4.id)
# crud.create_event_attendee(scout.id, event_4.id)

# crud.create_event_attendee(rory.id, event_5.id)
# crud.create_event_attendee(lisa.id, event_5.id)
# crud.create_event_attendee(jo.id, event_5.id)

# crud.create_event_attendee(bernard.id, event_6.id)
# crud.create_event_attendee(klaus.id, event_6.id)
# crud.create_event_attendee(guy.id, event_6.id)
# crud.create_event_attendee(scout.id, event_6.id)


