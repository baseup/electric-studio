import tornado.testing
import unittest

TEST_MODULES = [
    'schedules_test',
]


def all():
    return unittest.defaultTestLoader.loadTestsFromNames(TEST_MODULES)

if __name__ == '__main__':
    tornado.testing.main()
