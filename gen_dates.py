import datetime

# W1 Monday = 2026-05-04, W20 Sunday = 2026-09-20
# 05/04 to 09/20 = 140 days = 20 weeks exactly
start = datetime.date(2026, 5, 4)
end = datetime.date(2026, 9, 20)
print(f"Days from {start} to {end}: {(end - start).days + 1}")
print(f"Weeks: {((end - start).days + 1) / 7}")
print(f"05/04 is {start.strftime('%A')}")
print(f"09/20 is {end.strftime('%A')}")

dow_names = ['一','二','三','四','五','六','日']
for w in range(20):
    ws = start + datetime.timedelta(days=w*7)
    we = ws + datetime.timedelta(days=6)
    print(f"\nW{w+1}: {ws.strftime('%m/%d')}-{we.strftime('%m/%d')}")
    for d_idx in range(7):
        day = ws + datetime.timedelta(days=d_idx)
        real_dow = day.weekday()  # 0=Mon
        print(f"  {dow_names[real_dow]} {day.strftime('%m/%d')} ({day.strftime('%A')})")
