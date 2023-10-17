#This is a collection of functional programming functions/utilities

import time
from functools import lru_cache

def curry(func):
    @lru_cache(maxsize=None)  # 2-3x speedup
    def curried(*args):
        if len(args) >= func.__code__.co_argcount:
            return func(*args)
        def more_curried(*more_args):
            return curried(*(args + more_args))
        return more_curried
    return curried

# def timed(func):
#     def wrapper(*args):
#         now = time.perf_counter_ns();
#         result = func(*args);
#         print(time.perf_counter_ns() - now);
#         return result;
#     return wrapper;

def timed(func):
    timings = {}
    def wrapper(*args):
        now = time.perf_counter_ns()
        result = func(*args)
        elapsed_time = time.perf_counter_ns() - now
        if result in locals():
            timings[result] = timings.get(result, 0) + elapsed_time
        return result
    def get_total_time(func):
        return timings.get(func, 0)
    wrapper.get_total_time = get_total_time
    return wrapper


def add2(x): return x+2;
def div2(x): return x/2;
        

@timed
@curry
def add(d, *args):
    result = [arg + d for arg in args]
    def next(*next_args):
        return add(d, *args, *next_args)
    def value():
        return result
    next.value = value
    return next

def addN(a, *xs):
    return [x + a for x in xs]
