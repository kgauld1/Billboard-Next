import billboard
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
import math, time
from torch.autograd import Variable
import matplotlib.pyplot as plt

charts = []
charts.append(billboard.ChartData('hot-100'))
charts.append(billboard.ChartData('hot-100', charts[0].previousDate))

previous = charts[0][:10]
current = charts[1][:10]

model = torch.load('trainedNet.pth')
model.eval()

def get_next():
	x = []
	y_train = []

	artists = {}

	for i in range(len(charts) - 1):
		x_train.append([])
		y_train.append([])
		for song in charts[i]:
			if song.artist not in artists:
				artists[song.artist] = random.random() * 10
			x_train[-1].extend([artists[song.artist], song.peakPos, song.lastPos, song.weeks, song.rank, song.isNew])
			found = False
			for c in charts[i+1]:
				if c.title == song.title:
					y_train[-1].append(c.rank)
					found = True
					break
			if not found:
				y_train[-1].append(101)


  #   if song in charts[i+1]:
  #     print('sc')
  # for song in charts[i+1]:
  #   if song.artist not in artists:
  #     artists[song.artist] = random.random() * 10
  #   y_train[-1].append(song.rank)

x_train = np.array(x_train)
y_train = np.array(y_train)
	pass