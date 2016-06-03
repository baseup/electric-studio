from app.controllers.api.schedules import query
from hurricane.helpers import to_json
import tornado

def on_message(self, message):
    message = tornado.escape.json_decode(message)

    date = self.get_value('date', message)
    ins = self.get_value('ins', message)
    branch = self.get_value('branch', message)

    schedules = yield query(self, date, ins, branch)

    self.publish_message(to_json(schedules), facility='schedules', broadcast=True)
