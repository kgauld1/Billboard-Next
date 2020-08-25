
import billboard
import pickle
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
import math, time
from torch.autograd import Variable
import matplotlib.pyplot as plt

class Network(nn.Module):
    def __init__(self, in_size=64):
      super(Network, self).__init__()
      # 300 -> 300 -> batch norm -> dropout -> 150 -> 150 -> batch norm -> dropout -> 100 -> 100
      self.l1 = nn.Linear(in_size, 300)
      self.l2 = nn.Linear(300, 300)
      self.l3 = nn.BatchNorm1d(300, track_running_stats=False)
      self.l4 = nn.Dropout(0.5)
      self.l5 = nn.Linear(300, 150)
      self.l6 = nn.Linear(150, 150)
      self.l7 = nn.BatchNorm1d(150, track_running_stats=False)
      self.l8 = nn.Dropout(0.5)
      self.l9 = nn.Linear(150, 100)
      self.l10 = nn.Linear(100, 100) 

    def forward(self, x):
      x = F.relu(self.l1(x))
      x = F.relu(self.l2(x))
      x = self.l3(x)
      x = self.l4(x)
      x = F.relu(self.l5(x))
      x = F.relu(self.l6(x))
      x = self.l7(x)
      x = self.l8(x)
      x = F.relu(self.l9(x))
      x = F.relu(self.l10(x))

      return x

import os 
dir_path = os.path.dirname(os.path.realpath(__file__))

charts = []
charts.append(billboard.ChartData('hot-100'))
charts.append(billboard.ChartData('hot-100', charts[0].previousDate))

previous = charts[0][:10]
current = charts[1][:10]

model = Network(600)
model.load_state_dict(torch.load('best.pt'))
model.eval()

artistFile = open('artists.pickle', 'rb')
artists = pickle.load(artistFile)

def get_next():

	charts = []
	charts.append(billboard.ChartData('hot-100'))
	charts.append(billboard.ChartData('hot-100', charts[0].previousDate))
	
	previous = charts[0][:10]
	current = charts[1][:10]

	x = []

	for song in charts[1]:
		x.extend([artists[song.artist], song.peakPos, song.lastPos, song.weeks, song.rank, song.isNew])

	return torch.FloatTensor(np.array([x, x]))

def predict():
	outputs = model(get_next())[0]
	newPos = np.argsort(list(outputs))
	ranking = []
	for p in newPos:
		chart = charts[1][p]
		name = chart.title
		artist = chart.artist
		ranking.append({'name': name, 'artist': artist})
	
	return ranking

def getCurrent():
  data = billboard.ChartData('hot-100')
  chs = []
  for song in data:
    chs.append({'name': song.title, 'artist': song.artist});
  return chs
  
def getPrevious():
  data = billboard.ChartData('hot-100')
  data = billboard.ChartData('hot-100', data.previousDate)
  chs = []
  for song in data:
    chs.append({'name': song.title, 'artist': song.artist});
  return chs