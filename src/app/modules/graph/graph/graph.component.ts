import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from "d3";
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
// import * as d3 from 'd3-selection';
import { Task } from 'src/app/share/models/task';
import { GraphCoreService } from '../core/graph-core.service';
import { GraphService } from '../services/graph.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  tasks$: Observable<Task[]>;

  nowDate = new Date();

  constructor(private graphService: GraphService) { }

  ngAfterViewInit(): void {
    this.graphService.getTasks()
    .pipe(
      tap(tasks => {
        this.paintGrid(tasks);
      })
    )
    .subscribe();
  }

  ngOnInit(): void {
    
  }

  refresh() {
    this.graphService.refresh();
  }

  dateChange(date: Date): void {
    console.log('date change')
  }

  private paintGrid = (tasks: Task[]) => {
    let renderLink = d3.linkVertical().x((d: any) => d.x).y((d: any)=> d.y)
    const links = [];
    let svg = d3.select(this.canvas.nativeElement)
      .append('svg')
        .attr("viewBox", "0, 0, 100%, 100%");

    const node = d3.hierarchy.prototype.constructor
    const root = new node;
    const nodes = [root];

    let link = svg
      .append("g")
        .attr('fill', 'none')
        .attr('stroke', '#000')
        .selectAll('.link');

    let n = svg
      .append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .selectAll('.node');

    const parent = nodes[Math.random() * nodes.length | 0];

    const child = Object.assign(new node, {parent, depth: parent.depth + 1});

    n = n.data(nodes)
      .enter()
      .append("circle")
        .attr("class", "node")
        .attr("r", 10)
        .attr("cx", (d: any) => d.parent ? d.parent.px : d.px = d.x)
        .attr("cy", (d: any) => d.parent ? d.parent.py : d.py = d.y)
      .merge(node);

    link = link.data(links)
      .enter()
        .insert('path', '.node')
        .attr('class', 'link')
        .attr('d', (d: any) => {
          const o = {x: d.source.px, y: d.source.py};
          return renderLink({source: o as any, target: o as any});
        })
      .merge(link as any);

    this.selectedGridItem();

    // ......

    // const valueRange = {
    //   begin: 30,
    //   end: tasks.length
    // };

    // const y = d3.scaleLinear([0, 400], [valueRange.begin, valueRange.end * 200]);

    // let svg = d3.select(this.canvas.nativeElement)
    //   .append('svg')
    //   .data(tasks);

    // svg.append('g')
    //   .attr('transform', 'translate(50,0)')      // This controls the vertical position of the Axis
    //   .call(d3.axisLeft(y))
    //   .attr('class', 'grid');

    // for (let day of new Array(this.nowDate.daysInMonth())) {
    //   interval += 25;
    //   // заменить на оси
    //   var line = svg.append("line")
    //     .attr("x1", 30)
    //     .attr("y1", interval)
    //     .attr("x2", 350)
    //     .attr("y2", interval)
    //     .attr('stroke-dasharray', '5,5')
    //     .attr('stroke', 'black')
    //     .attr('opacity', '0.2')
    //     // .style("cursor", "pointer")
    //     .on("click", (event) => this.selectedGridItem(event));
    // }
  }

  private selectedGridItem = () => {
  
    const tree = d3.tree().size([300 - 20, 300 - 20])
  } 

  private paintTask = (task: Task) => {

  }
}
