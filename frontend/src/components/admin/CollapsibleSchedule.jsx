import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

import { scheduleData, timeSlots } from "@/constants";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "destructive";
    case "medium":
      return "warning";
    case "low":
      return "secondary";
    default:
      return "default";
  }
};

const CollapsibleSchedule = () => {
  return (
    <Accordion
      type="single"
      collapsible
    >
      {timeSlots.map((time) => {
        return (
          <AccordionItem
            value={time}
            key={time}
          >
            <AccordionTrigger>{time}</AccordionTrigger>
            <AccordionContent>
              {scheduleData[time] ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {scheduleData[time].map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-2 pb-4 last:pb-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{item.item}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant={getPriorityColor(item.priority)}
                                >
                                  {item.priority}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {item.quantity} {item.unit}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {item.estimatedTime} min
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-2 rounded-full bg-muted" />
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default CollapsibleSchedule;
