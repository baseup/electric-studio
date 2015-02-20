# A function that runs before your Tornado app run.
# This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
def bootstrap(app):
    print('test bootstrap')
    pass

# Called at the beginning of a request before get/post/etc.
# Override this method to perform common initialization regardless of the request method.
def prepare(self):
    print('test prepare')
    pass

# Called after the end of a request.
# Override this method to perform cleanup, logging, etc.
# This method is a counterpart to prepare.
# on_finish may not produce any output, as it is called after the response has been sent to the client.
def on_finish(self):
    print('test finish')
    pass

# A function that runs when your Tornado app stop running.
# It is the last opportunity to do any work before the script terminates.
def shutdown(app):
    print('shutdown')
    pass