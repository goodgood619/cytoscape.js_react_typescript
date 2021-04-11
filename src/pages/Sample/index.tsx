import SelectBox from '../../components/Select';
import CytoScapeExample from '../../components/practice';
import {observer} from 'mobx-react-lite';
import SampleSelectStore from '../../store/Select';
import { useEffect, useState } from 'react';

// sample elements
const elements = [
    {data : {id : 'CMX1',label : 'CMX16A-W35', node : 'CMX',colored : 'blue'},position : {x : 500, y : 500}},
    {data : {id : 'CMX2',label : 'CMX16A-W53', node : 'CMX',colored : 'blue'},position : {x : 500, y: 600}},
    {data : {id : 'CMX3',label : 'CMX16A-W55',node : 'CMX',colored : 'blue'},position : {x : 500, y : 700}},
    {data : {id : 'LIM1',label : 'LIM-3C',node : 'LIM',colored : 'blue'},position : {x : 600, y : 600}},
    {data : {id : 'LIM2',label : 'LID-6C',node : 'LID',colored : 'blue'},position : {x : 700, y : 600}},
    {data : {id : 'SRN1',label : 'SRN8A-35L',node : 'SRN',colored : 'blue'},position : {x : 800, y : 300}},
    {data : {id : 'SRN2',label : 'SRN8A-35H',node : 'SRN',colored : 'blue'},position : {x : 800, y : 400}},
    {data : {id : 'SRN3',label : 'SRN8A-53L',node : 'SRN',colored : 'blue'},position : {x : 800, y : 500}},
    {data : {id : 'SRN4',label : 'SRN8A-53H',node : 'SRN',colored : 'blue'},position : {x : 800, y : 600}},
    {data : {id : 'SRN5',label : 'SRN8A-55L',node : 'SRN',colored : 'blue'},position : {x : 800, y : 700}},
    {data : {id : 'SRN6',label : 'SRN8A-55H',node : 'SRN',colored : 'blue'},position : {x : 800, y : 800}},
    {data : {id : 'OTS1',label : 'OTS',node : 'OTS',colored : 'red'}, position : {x : 900, y : 300}},
    {data : {id : 'OTS2',label : 'OTS',node : 'OTS',colored : 'red'},position : {x : 900, y : 400}},
    {data : {id : 'OTS3',label : 'OTS',node : 'OTS',colored : 'red'},position : {x : 900, y : 500}},
    {data : {id : 'OTS4',label : 'OTS',node : 'OTS',colored : 'red'},position : {x : 900, y : 600}},
    {data : {id : 'OTS5',label : 'OTS',node : 'OTS',colored : 'red'},position : {x : 900, y : 700}},
    {data : {id : 'OTS6',label : 'OTS',node : 'OTS',colored : 'red'},position : {x : 900, y : 800}},
    {data : {id : 'RU1',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 300}},
    {data : {id : 'RU2',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 400}},
    {data : {id : 'RU3',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 500}},
    {data : {id : 'RU4',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 600}},
    {data : {id : 'RU5',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 700}},
    {data : {id : 'RU6',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 800}},
    {data : {id : 'IA1',label : '',node : 'IA',colored : 'red'},position : {x : 400, y : 500 }},
    {data : {id : 'IA2',label : '',node : 'IA',colored : 'red'},position : {x : 400, y : 600 }},
    {data : {id : 'IA3',label : '',node : 'IA',colored : 'red'},position : {x : 400, y : 700 }},
    {data : {id : 'DU1',label : 'DU',node : 'DU',colored : 'red'},position : {x: 300,y : 500}},
    {data : {id : 'DU2',label : 'DU',node : 'DU',colored : 'red'},position : {x : 300, y : 600 }},
    {data : {id : 'DU3',label : 'DU',node : 'DU',colored : 'red'},position : {x : 300, y :700 }},
    {data : {id : 'OCM1',label : 'OCM-8C',node : 'OCM',colored : 'red'},position : {x: 600, y : 700}},
    {data : {id : 's4',source : 'CMX1',target : 'LIM1',colored : 'blue'}},
    {data : {id : 's5',source : 'CMX2',target : 'LIM1', colored : 'blue'}},
    {data : {id : 's6',source : 'CMX3',target : 'LIM1',colored : 'blue'}},
    {data : {id : 's7',source : 'LIM1',target : 'LIM2', colored: 'yellow'}},
    {data : {id : 's8',source : 'LIM2',target : 'LIM1', colored : 'yellow'}},
    {data : {id : 's9',source : 'SRN1',target : 'LIM2',colored : 'blue'}},
    {data : {id : 's10',source : 'SRN2',target : 'LIM2', colored : 'blue'}},
    {data : {id : 's11',source : 'SRN3',target : 'LIM2', colored : 'blue'}},
    {data : {id : 's12',source : 'SRN4',target : 'LIM2', colored : 'blue'}},
    {data : {id : 's13',source : 'SRN5',target : 'LIM2', colored : 'blue'}},
    {data : {id : 's14',source : 'SRN6',target : 'LIM2', colored : 'blue'}},
    {data : {id : 's15',source : 'OTS1',target : 'SRN1',colored : 'blue'}},
    {data : {id : 's16',source : 'OTS2',target : 'SRN2', colored : 'blue'}},
    {data : {id : 's17',source : 'OTS3',target : 'SRN3', colored : 'blue'}},
    {data : {id : 's18',source : 'OTS4',target : 'SRN4', colored : 'blue'}},
    {data : {id : 's19',source : 'OTS5',target : 'SRN5',colored : 'blue'}},
    {data : {id : 's20',source : 'OTS6',target : 'SRN6',colored : 'blue'}},
    {data : {id : 's21',source : 'RU1',target : 'OTS1'}},
    {data : {id : 's22',source : 'RU2',target : 'OTS2'}},
    {data : {id : 's23',source : 'RU3',target : 'OTS3'}},
    {data : {id : 's24',source : 'RU4',target : 'OTS4'}},
    {data : {id : 's25',source : 'RU5',target : 'OTS5'}},
    {data : {id : 's26',source : 'RU6',target : 'OTS6'}},
    {data : {id : 's27',source : 'DU1',target : 'IA1'}},
    {data : {id : 's28',source : 'DU2',target : 'IA2'}},
    {data : {id : 's29',source : 'DU3',target : 'IA3'}},
    {data : {id : 's30',source : 'IA1',target : 'CMX1',colored : 'blue'}},
    {data : {id : 's31',source : 'IA2',target : 'CMX2',colored : 'blue'}},
    {data : {id : 's32',source : 'IA3',target : 'CMX3',colored : 'blue'}},
    {data : {id : 's33',source : 'OCM1',target : 'LIM1',colored : 'blue'}},
 ];
const elements2 = [
{data : {id : 'CMX1',label : 'CMX16A-W35', node : 'CMX',colored : 'blue'},position : {x : 500, y : 500}},
{data : {id : 'CMX2',label : 'CMX16A-W53', node : 'CMX',colored : 'blue'},position : {x : 500, y: 600}},
{data : {id : 'CMX3',label : 'CMX16A-W55',node : 'CMX',colored : 'blue'},position : {x : 500, y : 700}},
{data : {id : 'LIM1',label : 'LIM-3C',node : 'LIM',colored : 'blue'},position : {x : 600, y : 600}},
{data : {id : 'CRN1',label : 'CRN8A-35L',node : 'CRN',colored : 'blue'},position : {x : 800, y : 300}},
{data : {id : 'CRN2',label : 'CRN8A-35H',node : 'CRN',colored : 'blue'},position : {x : 800, y : 400}},
{data : {id : 'CRN3',label : 'CRN8A-53L',node : 'CRN',colored : 'blue'},position : {x : 800, y : 500}},
{data : {id : 'CRN4',label : 'CRN8A-53H',node : 'CRN',colored : 'blue'},position : {x : 800, y : 600}},
{data : {id : 'CRN5',label : 'CRN8A-55L',node : 'CRN',colored : 'blue'},position : {x : 800, y : 700}},
{data : {id : 'CRN6',label : 'CRN8A-55H',node : 'CRN',colored : 'blue'},position : {x : 800, y : 800}},
{data : {id : 'IA2_1',label : 'IA-3200N',node : 'IA',colored : 'red'}, position : {x : 900, y : 300}},
{data : {id : 'IA2_2',label : 'IA-3200N',node : 'IA',colored : 'red'},position : {x : 900, y : 400}},
{data : {id : 'IA2_3',label : 'IA-3200N',node : 'IA',colored : 'red'},position : {x : 900, y : 500}},
{data : {id : 'IA2_4',label : 'IA-3200N',node : 'IA',colored : 'red'},position : {x : 900, y : 600}},
{data : {id : 'IA2_5',label : 'IA-3200N',node : 'IA',colored : 'red'},position : {x : 900, y : 700}},
{data : {id : 'IA2_6',label : 'IA-3200N',node : 'IA',colored : 'red'},position : {x : 900, y : 800}},
{data : {id : 'RU1',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 300}},
{data : {id : 'RU2',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 400}},
{data : {id : 'RU3',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 500}},
{data : {id : 'RU4',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 600}},
{data : {id : 'RU5',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 700}},
{data : {id : 'RU6',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 800}},
{data : {id : 'IA1',label : '',node : 'IA',colored : 'red'},position : {x : 400, y : 500 }},
{data : {id : 'IA2',label : '',node : 'IA',colored : 'red'},position : {x : 400, y : 600 }},
{data : {id : 'IA3',label : '',node : 'IA',colored : 'red'},position : {x : 400, y : 700 }},
{data : {id : 'DU1',label : 'DU',node : 'DU',colored : 'red'},position : {x: 300,y : 500}},
{data : {id : 'DU2',label : 'DU',node : 'DU',colored : 'red'},position : {x : 300, y : 600 }},
{data : {id : 'DU3',label : 'DU',node : 'DU',colored : 'red'},position : {x : 300, y :700 }},
{data : {id : 'OCM1',label : 'OCM-8C',node : 'OCM',colored : 'red'},position : {x: 600, y : 700}},
{data : {id : 'p4',source : 'CMX1',target : 'LIM1',colored : 'blue'}},
{data : {id : 'p5',source : 'CMX2',target : 'LIM1', colored : 'blue'}},
{data : {id : 'p6',source : 'CMX3',target : 'LIM1',colored : 'blue'}},
{data : {id : 'p7',source : 'LIM1',target : 'CRN1', colored: 'yellow'}},
{data : {id : 'p8',source : 'CRN1',target : 'CRN2',colored : 'yellow'}},
{data : {id : 'p9',source : 'CRN2',target : 'CRN3', colored : 'yellow'}},
{data : {id : 'p10',source : 'CRN3',target : 'CRN4', colored : 'yellow'}},
{data : {id : 'p11',source : 'CRN4',target : 'CRN5', colored : 'yellow'}},
{data : {id : 'p12',source : 'CRN5',target : 'CRN6', colored : 'yellow'}},
{data : {id : 'p13',source : 'CRN1',target : 'IA2_1',colored : 'blue'}},
{data : {id : 'p14',source : 'CRN2',target : 'IA2_2', colored : 'blue'}},
{data : {id : 'p15',source : 'CRN3',target : 'IA2_3', colored : 'blue'}},
{data : {id : 'p18',source : 'CRN4',target : 'IA2_4', colored : 'blue'}},
{data : {id : 'p19',source : 'CRN5',target : 'IA2_5',colored : 'blue'}},
{data : {id : 'p20',source : 'CRN6',target : 'IA2_6',colored : 'blue'}},
{data : {id : 'p21',source : 'IA2_1',target : 'RU1'}},
{data : {id : 'p22',source : 'IA2_2',target : 'RU2'}},
{data : {id : 'p23',source : 'IA2_3',target : 'RU3'}},
{data : {id : 'p24',source : 'IA2_4',target : 'RU4'}},
{data : {id : 'p25',source : 'IA2_5',target : 'RU5'}},
{data : {id : 'p26',source : 'IA2_6',target : 'RU6'}},
{data : {id : 'p27',source : 'DU1',target : 'IA1'}},
{data : {id : 'p28',source : 'DU2',target : 'IA2'}},
{data : {id : 'p29',source : 'DU3',target : 'IA3'}},
{data : {id : 'p30',source : 'IA1',target : 'CMX1',colored : 'blue'}},
{data : {id : 'p31',source : 'IA2',target : 'CMX2',colored : 'blue'}},
{data : {id : 'p32',source : 'IA3',target : 'CMX3',colored : 'blue'}},
{data : {id : 'p33',source : 'OCM1',target : 'LIM1',colored : 'blue'}},
];

const elements3 = [
    {data : {id : 'CMX1',label : 'CMX16A-W35', node : 'CMX',colored : 'blue'},position : {x : 500, y : 500}},
    {data : {id : 'CMX2',label : 'CMX16A-W53', node : 'CMX',colored : 'blue'},position : {x : 500, y: 600}},
    {data : {id : 'CMX3',label : 'CMX16A-W55',node : 'CMX',colored : 'blue'},position : {x : 500, y : 700}},
    {data : {id : 'LIM1',label : 'LIM-3C',node : 'LIM',colored : 'blue'},position : {x : 600, y : 600}},
    {data : {id : 'LMU',label : 'LMU-PR',node : 'LMU',colored : 'blue'},position : {x : 800, y : 600}},
    {data : {id : 'LSU',label : 'LSU-PS',node : 'LSU',colored : 'red'},position : {x : 700, y : 600}},
    {data : {id : 'SRN1',label : 'SRN8A-35L',node : 'SRN',colored : 'blue'},position : {x : 900, y : 300}},
    {data : {id : 'SRN2',label : 'SRN8A-35H',node : 'SRN',colored : 'blue'},position : {x : 900, y : 400}},
    {data : {id : 'SRN3',label : 'SRN8A-53L',node : 'SRN',colored : 'blue'},position : {x : 900, y : 500}},
    {data : {id : 'SRN4',label : 'SRN8A-53H',node : 'SRN',colored : 'blue'},position : {x : 900, y : 600}},
    {data : {id : 'SRN5',label : 'SRN8A-55L',node : 'SRN',colored : 'blue'},position : {x : 900, y : 700}},
    {data : {id : 'SRN6',label : 'SRN8A-55H',node : 'SRN',colored : 'blue'},position : {x : 900, y : 800}},
    {data : {id : 'RU1',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 300}},
    {data : {id : 'RU2',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 400}},
    {data : {id : 'RU3',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 500}},
    {data : {id : 'RU4',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 600}},
    {data : {id : 'RU5',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 700}},
    {data : {id : 'RU6',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1000, y : 800}},
    {data : {id : 'IA1',label : '',node : 'IA',colored : 'red'},position : {x : 400, y : 500 }},
    {data : {id : 'IA2',label : '',node : 'IA',colored : 'red'},position : {x : 400, y : 600 }},
    {data : {id : 'IA3',label : '',node : 'IA',colored : 'red'},position : {x : 400, y : 700 }},
    {data : {id : 'DU1',label : 'DU',node : 'DU',colored : 'red'},position : {x: 300,y : 500}},
    {data : {id : 'DU2',label : 'DU',node : 'DU',colored : 'red'},position : {x : 300, y : 600 }},
    {data : {id : 'DU3',label : 'DU',node : 'DU',colored : 'red'},position : {x : 300, y :700 }},
    {data : {id : 'OCM1',label : 'OCM-8C',node : 'OCM',colored : 'red'},position : {x: 600, y : 700}},
    {data : {id : 'E4',source : 'CMX1',target : 'LIM1',colored : 'blue'}},
    {data : {id : 'E5',source : 'CMX2',target : 'LIM1', colored : 'blue'}},
    {data : {id : 'E6',source : 'CMX3',target : 'LIM1',colored : 'blue'}},
    {data : {id : 'E7',source : 'LIM1',target : 'LSU', colored: 'yellow'}},
    {data : {id : 'E8',source : 'LSU',target : 'LMU', colored: 'yellow'}},
    {data : {id : 'E9',source : 'SRN1',target : 'LMU',colored : 'yellow'}},
    {data : {id : 'E10',source : 'SRN2',target : 'LMU', colored : 'yellow'}},
    {data : {id : 'E11',source : 'SRN3',target : 'LMU', colored : 'yellow'}},
    {data : {id : 'E12',source : 'SRN4',target : 'LMU', colored : 'yellow'}},
    {data : {id : 'E13',source : 'SRN5',target : 'LMU', colored : 'yellow'}},
    {data : {id : 'E14',source : 'SRN6',target : 'LMU', colored : 'yellow'}},
    {data : {id : 'E15',source : 'SRN1',target : 'RU1'}},
    {data : {id : 'E16',source : 'SRN2',target : 'RU2'}},
    {data : {id : 'E17',source : 'SRN3',target : 'RU3'}},
    {data : {id : 'E18',source : 'SRN4',target : 'RU4'}},
    {data : {id : 'E19',source : 'SRN5',target : 'RU5'}},
    {data : {id : 'E20',source : 'SRN6',target : 'RU6'}},
    {data : {id : 'E21',source : 'DU1',target : 'IA1'}},
    {data : {id : 'E22',source : 'DU2',target : 'IA2'}},
    {data : {id : 'E23',source : 'DU3',target : 'IA3'}},
    {data : {id : 'E24',source : 'IA1',target : 'CMX1',colored : 'blue'}},
    {data : {id : 'E25',source : 'IA2',target : 'CMX2',colored : 'blue'}},
    {data : {id : 'E26',source : 'IA3',target : 'CMX3',colored : 'blue'}},
    {data : {id : 'E27',source : 'OCM1',target : 'LIM1',colored : 'blue'}},
    {data : {id : 'E28',source : 'LSU',target : 'LMU', colored: 'yellow'}},
];

const element4 = [
    {data : {id : 'CMX1',label : 'CMX8A-W35L', node : 'CMX',colored : 'blue'},position : {x : 500, y : 500}},
    {data : {id : 'CMX2',label : 'CMX16A-W53', node : 'CMX',colored : 'blue'},position : {x : 500, y: 600}},
    {data : {id : 'CMX3',label : 'CMX8A-W35H',node : 'CMX',colored : 'blue'},position : {x : 500, y : 700}},
    {data : {id : 'CMX4',label : 'CMX16A-W55',node : 'CMX',colored : 'blue'},position : {x : 500, y : 800}},
    {data : {id : 'LIM',label : 'LIM-3C',node : 'LIM',colored : 'blue'},position : {x : 700, y : 600}},
    {data : {id : 'LMU1',label : 'LMU-SR1',node : 'LMU',colored : 'blue'},position : {x : 800, y : 600}},
    {data : {id : 'LMU2',label : 'LMU-SR2',node : 'LMU',colored : 'blue'},position : {x : 800, y : 700}},
    {data : {id : 'LSU1',label : 'LSU-S1',node : 'LSU',colored : 'red'},position : {x : 600, y : 600}},
    {data : {id : 'LSU2',label : 'LSU-S2',node : 'LSU',colored : 'red'},position : {x : 600, y : 700}},
    {data : {id : 'SRN1',label : 'SRN8A-35L',node : 'SRN',colored : 'blue'},position : {x : 900, y : 300}},
    {data : {id : 'SRN2',label : 'SRN8A-35H',node : 'SRN',colored : 'blue'},position : {x : 900, y : 400}},
    {data : {id : 'SRN3',label : 'SRN8A-53L',node : 'SRN',colored : 'blue'},position : {x : 900, y : 500}},
    {data : {id : 'SRN4',label : 'SRN8A-53H',node : 'SRN',colored : 'blue'},position : {x : 900, y : 600}},
    {data : {id : 'SRN5',label : 'SRN8A-55L',node : 'SRN',colored : 'blue'},position : {x : 900, y : 700}},
    {data : {id : 'SRN6',label : 'SRN8A-55H',node : 'SRN',colored : 'blue'},position : {x : 900, y : 800}},
    {data : {id : 'IA2_1',label : 'IA-3200N',node : 'IA',colored : 'red'}, position : {x : 1000, y : 300}},
    {data : {id : 'IA2_2',label : 'IA-3200N',node : 'IA',colored : 'red'},position : {x : 1000, y : 400}},
    {data : {id : 'IA2_3',label : 'IA-3200N',node : 'IA',colored : 'red'},position : {x : 1000, y : 500}},
    {data : {id : 'IA2_4',label : 'IA-3200N',node : 'IA',colored : 'red'},position : {x : 1000, y : 600}},
    {data : {id : 'IA2_5',label : 'IA-3200N',node : 'IA',colored : 'red'},position : {x : 1000, y : 700}},
    {data : {id : 'IA2_6',label : 'IA-3200N',node : 'IA',colored : 'red'},position : {x : 1000, y : 800}},
    {data : {id : 'RU1',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1100, y : 300}},
    {data : {id : 'RU2',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1100, y : 400}},
    {data : {id : 'RU3',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1100, y : 500}},
    {data : {id : 'RU4',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1100, y : 600}},
    {data : {id : 'RU5',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1100, y : 700}},
    {data : {id : 'RU6',label : 'RU',node : 'RU',colored : 'red'},position : {x : 1100, y : 800}},
    {data : {id : 'IA1',label : '',node : 'IA',colored : 'red'},position : {x : 400, y : 500 }},
    {data : {id : 'IA2',label : '',node : 'IA',colored : 'red'},position : {x : 400, y : 600 }},
    {data : {id : 'IA3',label : '',node : 'IA',colored : 'red'},position : {x : 400, y : 700 }},
    {data : {id : 'IA4',label : '',node : 'IA',colored : 'red'},position : {x : 400, y : 800 }},
    {data : {id : 'DU1',label : 'DU',node : 'DU',colored : 'red'},position : {x: 300,y : 500}},
    {data : {id : 'DU2',label : 'DU',node : 'DU',colored : 'red'},position : {x : 300, y : 600 }},
    {data : {id : 'DU3',label : 'DU',node : 'DU',colored : 'red'},position : {x : 300, y :700 }},
    {data : {id : 'DU4',label : 'DU',node : 'DU',colored : 'red'},position : {x : 300, y :800 }},
    {data : {id : 'OCM1',label : 'OCM-8C',node : 'OCM',colored : 'red'},position : {x: 700, y : 800}},
    {data : {id : 'e4',source : 'CMX1',target : 'LSU1',colored : 'blue'}},
    {data : {id : 'e5',source : 'CMX2',target : 'LSU1', colored : 'blue'}},
    {data : {id : 'e6',source : 'CMX3',target : 'LSU2',colored : 'blue'}},
    {data : {id : 'e7',source : 'CMX4',target : 'LSU2',colored : 'blue'}},
    {data : {id : 'e8',source : 'LSU1',target : 'LIM', colored: 'yellow'}},
    {data : {id : 'e9',source : 'LSU2',target : 'LIM',colored : 'yellow'}},
    {data : {id : 'e10',source : 'LIM',target : 'LMU1',colored : 'yellow'}},
    {data : {id : 'e11',source : 'LIM',target : 'LMU2',colored : 'yellow'}},
    {data : {id : 'e12',source : 'SRN1',target : 'LMU1', colored : 'blue'}},
    {data : {id : 'e13',source : 'SRN2',target : 'LMU1', colored : 'blue'}},
    {data : {id : 'e14',source : 'SRN3',target : 'LMU1', colored : 'blue'}},
    {data : {id : 'e15',source : 'SRN4',target : 'LMU2', colored : 'blue'}},
    {data : {id : 'e16',source : 'SRN5',target : 'LMU2', colored : 'blue'}},
    {data : {id : 'e17',source : 'SRN6',target : 'LMU2', colored : 'blue'}},
    {data : {id : 'e18',source : 'IA2_1',target : 'RU1'}},
    {data : {id : 'e19',source : 'IA2_2',target : 'RU2'}},
    {data : {id : 'e20',source : 'IA2_3',target : 'RU3'}},
    {data : {id : 'e21',source : 'IA2_4',target : 'RU4'}},
    {data : {id : 'e22',source : 'IA2_5',target : 'RU5'}},
    {data : {id : 'e23',source : 'IA2_6',target : 'RU6'}},
    {data : {id : 'e24',source : 'DU1',target : 'IA1'}},
    {data : {id : 'e25',source : 'DU2',target : 'IA2'}},
    {data : {id : 'e26',source : 'DU3',target : 'IA3'}},
    {data : {id : 'e27',source : 'DU4',target : 'IA4'}},
    {data : {id : 'e28',source : 'IA1',target : 'CMX1',colored : 'blue'}},
    {data : {id : 'e29',source : 'IA2',target : 'CMX2',colored : 'blue'}},
    {data : {id : 'e30',source : 'IA3',target : 'CMX3',colored : 'blue'}},
    {data : {id : 'e31',source : 'IA4',target : 'CMX4',colored : 'blue'}},
    {data : {id : 'e32',source : 'OCM1',target : 'LIM',colored : 'blue'}},
    {data : {id : 'e33',source : 'IA2_1',target : 'SRN1'}},
    {data : {id : 'e34',source : 'IA2_2',target : 'SRN2'}},
    {data : {id : 'e35',source : 'IA2_3',target : 'SRN3'}},
    {data : {id : 'e36',source : 'IA2_4',target : 'SRN4'}},
    {data : {id : 'e37',source : 'IA2_5',target : 'SRN5'}},
    {data : {id : 'e38',source : 'IA2_6',target : 'SRN6'}},
    {data : {id : 'e39',source : 'LSU1',target : 'LIM', colored: 'orange'}},
    {data : {id : 'e40',source : 'LSU2',target : 'LIM',colored : 'orange'}},
];

const Sample = () => {

    const[elem,setElem] = useState<Array<any>>(elements); 

    const handleSelectedTopology = (e : any) => {
        SampleSelectStore.setSelectedTopology(e);
        if(e === 'WDM-PON-P2P') {
            setElem(elements);
        }
        else if(e === 'WDM-PON-Cascade') {
            setElem(elements2);
        }
        else if(e === 'WDM-PON-P2P_Protection') {
            setElem(elements3);
        }
        else if(e === 'WDM-PON-P2P_RingProtection') {
            setElem(element4);
        }
    };

    useEffect(() => {

    },[]);

    return (
        <div>
            <SelectBox handle = {handleSelectedTopology}/>
            <CytoScapeExample elements = {elem}/>
        </div>
    );
};

export default Sample;